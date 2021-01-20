# cwebp file in images/portfolio
for file in images/portfolio/*; do
    cwebp -q 50 "$file" -o "${file%.*}.webp"
done
