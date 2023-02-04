#!/bin/bash

PUBLIC=public
ATOM=$PUBLIC/atom.xml
BASE_URL=https://<YOUR_HOST>

mapfile -t dates < <(grep -Po '<published>\K[^<]*(?=</published>)' $ATOM)
mapfile -t titles < <(grep -Po '<title>\K[^<]*(?=</title>)' $ATOM)
mapfile -t slugs < <(grep -Po "<link href=\"$BASE_URL/\K[^/]*" $ATOM)

# Remove the top level <title> & <link>
titles=("${titles[@]:1}")
slugs=("${slugs[@]:1}")

read -r -d '' outbox <<EOF
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "$BASE_URL/outbox",
	"type": "OrderedCollection",
	"totalItems": ${#dates[@]},
	"orderedItems": [
EOF

mkdir -p $PUBLIC/note
mkdir -p $PUBLIC/create
mkdir -p $PUBLIC/likes
mkdir -p $PUBLIC/replies

for i in "${!dates[@]}"; do
	SLUG=${slugs[i]}
	PATH_CREATE=create/$SLUG
	PATH_NOTE=note/$SLUG
	read -r -d '' NOTE <<EOF
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "$BASE_URL/$PATH_NOTE",
	"url": "$BASE_URL/$SLUG",
	"attributedTo": "$BASE_URL/actor",
	"likes": "$BASE_URL/likes/$SLUG",
	"replies": "$BASE_URL/replies/$SLUG",
	"type": "Note",
	"published": "${dates[i]}",
	"to": ["https://www.w3.org/ns/activitystreams#Public"],
	"cc": ["$BASE_URL/followers"],
	"content": "New post: <a href=\"$BASE_URL/$SLUG\">${titles[i]}</a>."
}
EOF
	echo "$NOTE" >$PUBLIC/"$PATH_NOTE"

	read -r -d '' CREATE <<EOF
{
	"@context": "https://www.w3.org/ns/activitystreams",
	"id": "$BASE_URL/$PATH_CREATE",
	"type": "Create",
	"actor": "$BASE_URL/actor",
	"object": "$BASE_URL/$PATH_NOTE"
}
EOF
	echo "$CREATE" >$PUBLIC/"$PATH_CREATE"

	outbox="$outbox$CREATE,"
done

echo "${outbox::-1}]}" >$PUBLIC/outbox
