#!/usr/bin/env node

export function saveLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLS(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
}

export function deleteLS(key) {
    localStorage.removeItem(key);
}
