#!/bin/bash

#
# Builds python/mac, a minimal PyTorch (MPS) environment for object
# classification. Run from the project root with miniforge installed.
#
#   bash ./scripts/python-env/create-env-mac.sh
#

set -e

ENV=breezy-python-mac
DIR=$(cd "$(dirname "$0")" && pwd)
OUT=python/mac

eval "$(conda shell.bash hook)"

conda remove -n $ENV --all --yes > /dev/null 2>&1 || true
conda create -n $ENV --yes -c conda-forge python=3.12 conda-pack
conda activate $ENV

python -m pip install --no-cache-dir -r "$DIR/requirements-mac.txt"

rm -rf $OUT.tar.gz $OUT
mkdir -p $(dirname $OUT)
conda-pack -n $ENV -o $OUT.tar.gz --ignore-missing-files
mkdir -p $OUT
tar -xzf $OUT.tar.gz -C $OUT
rm $OUT.tar.gz

conda deactivate
conda remove -n $ENV --all --yes

$OUT/bin/python $OUT/bin/conda-unpack
bash "$DIR/prune-env.sh" $OUT

# The app runs Python with PYTHONDONTWRITEBYTECODE, writing into the signed
# bundle would break its signature. Hash-based .pyc files stay valid no matter
# what happens to file timestamps during packaging.
$OUT/bin/python -m compileall -q -j 0 --invalidation-mode unchecked-hash $OUT/lib/python3.12 || true

$OUT/bin/python "$DIR/verify-env.py"
du -sh $OUT
