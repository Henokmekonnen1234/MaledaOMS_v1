#!/usr/bin/env node

export function formatDate(value){
    let date = new Date(value);
    return date.toDateString();
}