#!/bin/bash

#
# Builds python/win, a minimal PyTorch (CUDA) environment for object
# classification. Run from the project root inside Git Bash with miniforge
# installed.
#
#   bash ./scripts/python-env/create-env-win.sh
#
# CUDA runs on NVIDIA GPUs with a recent driver. Without one, training runs
# on the CPU.
#

set -e

ENV=breezy-python-win
DIR=$(cd "$(dirname "$0")" && pwd)
OUT=python/win

eval "$(conda shell.bash hook)"

conda remove -n $ENV --all --yes > /dev/null 2>&1 || true
conda create -n $ENV --yes -c conda-forge python=3.12 conda-pack
conda activate $ENV

python -m pip install --no-cache-dir -r "$DIR/requirements-win.txt"

rm -rf $OUT.tar.gz $OUT
mkdir -p $(dirname $OUT)
conda-pack -n $ENV -o $OUT.tar.gz --ignore-missing-files
mkdir -p $OUT
tar -xzf $OUT.tar.gz -C $OUT
rm $OUT.tar.gz

conda deactivate
conda remove -n $ENV --all --yes

$OUT/Scripts/conda-unpack.exe
bash "$DIR/prune-env.sh" $OUT

# The app runs Python with PYTHONDONTWRITEBYTECODE, Program Files isn't
# writable. Hash-based .pyc files stay valid no matter what happens to file
# timestamps during packaging.
$OUT/python.exe -m compileall -q -j 0 --invalidation-mode unchecked-hash $OUT/Lib || true

# Verify, this should report cuda on a machine with an NVIDIA GPU
PATH="$(pwd)/$OUT:$(pwd)/$OUT/Library/bin:$PATH" $OUT/python.exe "$DIR/verify-env.py"
du -sh $OUT
