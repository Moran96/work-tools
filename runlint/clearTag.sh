#!/bin/bash

cd D:/project/xxxxx-web

git push origin --delete tag $(git tag -l | awk '/2\.4\.0\-2024/{print}')
