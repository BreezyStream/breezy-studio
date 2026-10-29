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

ICONSET="${OUTDIR}/icon.iconset"

mkdir -p "${OUTDIR}"
mkdir -p "${ICONSET}"

echo "→ Generating macOS iconset PNGs"

sips -z 16 16     "${MASTER}" --out "${ICONSET}/icon_16x16.png" >/dev/null
sips -z 32 32     "${MASTER}" --out "${ICONSET}/icon_16x16@2x.png" >/dev/null
sips -z 32 32     "${MASTER}" --out "${ICONSET}/icon_32x32.png" >/dev/null
sips -z 64 64     "${MASTER}" --out "${ICONSET}/icon_32x32@2x.png" >/dev/null
sips -z 128 128   "${MASTER}" --out "${ICONSET}/icon_128x128.png" >/dev/null
sips -z 256 256   "${MASTER}" --out "${ICONSET}/icon_128x128@2x.png" >/dev/null
sips -z 256 256   "${MASTER}" --out "${ICONSET}/icon_256x256.png" >/dev/null
sips -z 512 512   "${MASTER}" --out "${ICONSET}/icon_256x256@2x.png" >/dev/null
sips -z 512 512   "${MASTER}" --out "${ICONSET}/icon_512x512.png" >/dev/null
cp -f "${MASTER}" "${ICONSET}/icon_512x512@2x.png"

iconutil -c icns "${ICONSET}" -o "${OUTDIR}/icon.icns"