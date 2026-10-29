#!/usr/bin/env bash
set -euo pipefail

MASTER="${1:-}"
OUTDIR="${2:-}"

if [[ -z "${MASTER}" || -z "${OUTDIR}" ]]; then
  echo "Usage: $0 <master.png|master.svg> <output_dir>"
  exit 1
fi

if [[ ! -f "${MASTER}" ]]; then
  echo "✖ Input not found: ${MASTER}"
  exit 1
fi

ICON="${OUTDIR}/icon.ico"

mkdir -p "${OUTDIR}"

convert \
	\( "${MASTER}" -resize 16x16 \) \
	\( "${MASTER}" -resize 24x24 \) \
	\( "${MASTER}" -resize 32x32 \) \
	\( "${MASTER}" -resize 48x48 \) \
	\( "${MASTER}" -resize 64x64 \) \
	\( "${MASTER}" -resize 128x128 \) \
	\( "${MASTER}" -resize 256x256 \) \
	"${ICON}"