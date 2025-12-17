"use client";

import React, { useState, useEffect } from "react";

export default function FiltersSidebar({
  collections,
  tags,
  initialCollections = [],
  initialTags = [],
  initialMin = "",
  initialMax = "",
}: {
  collections: { handle: string; title: string }[];
  tags: string[];
  initialCollections?: string[];
  initialTags?: string[];
  initialMin?: string;
  initialMax?: string;
}) {
  const [selectedCollections, setSelectedCollections] = useState<string[]>(initialCollections || []);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags || []);
  const [min, setMin] = useState<string>(initialMin || "");
  const [max, setMax] = useState<string>(initialMax || "");
  const [previewUrl, setPreviewUrl] = useState<string>("/allproducts");

  // Ensure state reflects current URL params on mount (so checkboxes remain checked after navigation)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const colsParam = params.get("collections") || "";
      const tgsParam = params.get("tags") || "";
      const cols = colsParam ? colsParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const tgs = tgsParam ? tgsParam.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const pmin = params.get("min") || initialMin || "";
      const pmax = params.get("max") || initialMax || "";
      if (cols && cols.length > 0) setSelectedCollections(cols);
      if (tgs && tgs.length > 0) setSelectedTags(tgs);
      setMin(pmin);
      setMax(pmax);
      // initial preview url
      const build = (cs: string[], ts: string[], pmin: string, pmax: string) => {
        const params = new URLSearchParams();
        if (cs && cs.length > 0) params.set("collections", cs.join(","));
        if (ts && ts.length > 0) params.set("tags", ts.join(","));
        if (pmin) params.set("min", pmin);
        if (pmax) params.set("max", pmax);
        return '/allproducts' + (params.toString() ? '?' + params.toString() : '');
      };
      setPreviewUrl(build(cols, tgs, pmin, pmax));
    } catch (e) {
      // ignore (server render)
    }
  }, []);

  const toggle = (arr: string[], val: string) => {
    if (arr.includes(val)) return arr.filter((a) => a !== val);
    return [...arr, val];
  };

  const buildUrl = (cols: string[], tgs: string[], pmin: string, pmax: string) => {
    const params = new URLSearchParams();
    if (cols && cols.length > 0) params.set("collections", cols.join(","));
    if (tgs && tgs.length > 0) params.set("tags", tgs.join(","));
    if (pmin) params.set("min", pmin);
    if (pmax) params.set("max", pmax);
    return '/allproducts' + (params.toString() ? '?' + params.toString() : '');
  };

  const apply = (collectionsToApply?: string[], tagsToApply?: string[]) => {
    const cols = collectionsToApply ?? selectedCollections;
    const tgs = tagsToApply ?? selectedTags;
    const url = buildUrl(cols, tgs, min, max);
    // navigate to server-rendered page with query params
    window.location.href = url;
  };

  return (
    <div className="max-w-[250px] w-full sticky top-40 h-full self-start border p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>

      <div className="mb-6">
        <div className="font-[600] mb-2">Collections</div>
        <div className="flex flex-col gap-2 max-h-40 overflow-auto pr-2">
          {collections.map((c) => (
            <label key={c.handle} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCollections.includes(c.handle)}
                onChange={() => {
                  const next = toggle(selectedCollections, c.handle);
                  setSelectedCollections(next);
                  setPreviewUrl(buildUrl(next, selectedTags, min, max));
                }}
              />
              <span className="text-gray-700">{c.title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="font-[600] mb-2">Price</div>
        <div className="flex gap-2">
          <input value={min} onChange={(e) => setMin(e.target.value)} name="min" placeholder="Min" className="w-1/2 border px-2 py-1 rounded" />
          <input value={max} onChange={(e) => setMax(e.target.value)} name="max" placeholder="Max" className="w-1/2 border px-2 py-1 rounded" />
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={() => apply()} className="px-3 py-1 border rounded bg-gray-100">Apply</button>
          <button onClick={() => (window.location.href = "/allproducts")} className="px-3 py-1 border rounded">Clear</button>
        </div>
        <div className="mt-2 text-xs text-gray-500">Preview URL: <span className="break-words">{previewUrl}</span></div>
      </div>

      <div>
        <div className="font-[600] mb-2">Tags</div>
        <div className="flex flex-col gap-2 max-h-40 overflow-auto pr-2">
          {tags.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedTags.includes(t)}
                onChange={() => {
                  const next = toggle(selectedTags, t);
                  setSelectedTags(next);
                  setPreviewUrl(buildUrl(selectedCollections, next, min, max));
                }}
              />
              <span className="text-gray-700">{t}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
