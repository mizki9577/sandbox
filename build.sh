#!/bin/sh

cat <<EOF > README.md
# sandbox

<https://mizkichan.github.io/sandbox>

EOF

subdirs=$(ls -d */)

for subdir in $subdirs; do
	cd $subdir
	npm run build &
	cd ..

	echo "- [$subdir](./$subdir)" >> README.md
done

cmark README.md > index.html
wait
