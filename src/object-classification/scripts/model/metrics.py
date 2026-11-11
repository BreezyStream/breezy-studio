import numpy as np
from typing import Any
from typing import Dict

#
# Constants
#

THRESHOLD = 0.5

#
# Function: compute_metrics
# Since: 2.0.0
#
# Micro-averaged over every (image, label) pair, the way the Keras metrics
# this replaces were computed.
#
#   y_true: (N, K) 0/1
#   y_prob: (N, K) sigmoid probabilities
#

def compute_metrics(y_true: np.ndarray, y_prob: np.ndarray) -> Dict[str, float]:

    true = y_true.reshape(-1) >= 0.5
    prob = y_prob.reshape(-1)
    pred = prob >= THRESHOLD

    tp = float(np.sum( true &  pred))
    fp = float(np.sum(~true &  pred))
    fn = float(np.sum( true & ~pred))

    return {
        "accuracy":  float(np.mean(true == pred)) if true.size else float("nan"),
        "precision": tp / (tp + fp) if (tp + fp) > 0 else 0.0,
        "recall":    tp / (tp + fn) if (tp + fn) > 0 else 0.0,
        "roc_auc":   roc_auc(true, prob),
        "pr_auc":    pr_auc(true, prob),
    }

#
# Function: compute_class_metrics
# Since: 2.0.0
#

def compute_class_metrics(y_true: np.ndarray, y_prob: np.ndarray) -> Dict[int, Dict[str, Any]]:

    y_pred = y_prob >= THRESHOLD

    data: Dict[int, Dict[str, Any]] = {}

    for index in range(y_true.shape[1]):

        true = y_true[:, index] >= 0.5
        pred = y_pred[:, index]

        tp = float(np.sum( true &  pred))
        fp = float(np.sum(~true &  pred))
        fn = float(np.sum( true & ~pred))

        support = int(np.sum(true))

        precision = tp / (tp + fp) if (tp + fp) > 0 else float("nan")
        recall    = tp / (tp + fn) if (tp + fn) > 0 else float("nan")
        f1        = float("nan")

        if np.isfinite(precision) and np.isfinite(recall) and (precision + recall) > 0:
            f1 = 2.0 * precision * recall / (precision + recall)

        entry: Dict[str, Any] = {"support": support}

        # NaN can't round-trip through JSON, so metrics that are
        # undefined for this class (e.g. no validation support) are
        # left out rather than emitted as an unparsable token.
        if np.isfinite(precision):
            entry["precision"] = round(precision, 6)

        if np.isfinite(recall):
            entry["recall"] = round(recall, 6)

        if np.isfinite(f1):
            entry["f1"] = round(f1, 6)

        data[index] = entry

    return data

# ------------------------------------------------------------------------------
# Private API
# ------------------------------------------------------------------------------

#
# Function: roc_auc
# Since: 2.0.0
# Hidden
#
# Probability that a random positive scores above a random negative
# (Mann-Whitney U), ties counted as half.
#

def roc_auc(true: np.ndarray, prob: np.ndarray) -> float:

    pos = int(np.sum(true))
    neg = int(true.size - pos)

    if pos == 0 or neg == 0:
        return float("nan")

    order = np.argsort(prob, kind="mergesort")
    ranks = np.empty(prob.size, dtype=np.float64)
    ranks[order] = np.arange(1, prob.size + 1)

    # Averages the ranks of tied scores.
    sorted_prob = prob[order]
    _, start, count = np.unique(sorted_prob, return_index=True, return_counts=True)
    for s, c in zip(start, count):
        if c > 1:
            ranks[order[s:s + c]] = s + (c + 1) / 2.0

    return float((np.sum(ranks[true]) - pos * (pos + 1) / 2.0) / (pos * neg))

#
# Function: pr_auc
# Since: 2.0.0
# Hidden
#
# Average precision: precision at each positive, averaged over positives.
#

def pr_auc(true: np.ndarray, prob: np.ndarray) -> float:

    pos = int(np.sum(true))

    if pos == 0:
        return float("nan")

    order = np.argsort(-prob, kind="mergesort")
    hits = true[order].astype(np.float64)

    tp = np.cumsum(hits)
    precision = tp / np.arange(1, hits.size + 1)

    return float(np.sum(precision * hits) / pos)
