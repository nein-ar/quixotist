---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true

# --- AUTHORSHIP & METADATA ---
author: "Antonio (@xplshn)"
affiliation: "Nein Labs"
version: "1.0.0"
license: "ISC"

# --- COVER SETTINGS ---
# cover: true generates a standalone printable title page.
cover: true
cover_style: "sleek"

# --- ABSTRACT ---
abstract: "This is a comprehensive template demonstrating the Quixotist feature set, from interactive D3.js globes to computational WERX logic."

tags: ["manual", "demo"]
toc: true
---

<!--
    SPECIAL TAG: .on-cover
    Anything with the class "on-cover" will be migrated to the cover page
    during printing. Use it for logos, special notices, or extra cover art.
-->
<div class="on-cover doc-center my-8">
    <div class="bunker-window inline-block p-4">
        <span class="text-xl font-bold uppercase tracking-widest">HI!</span>
    </div>
</div>

<p class="dropcap doc-justify">
    Welcome to your new Quixotist document. This archetype serves as a living manual, showcasing every interactive and structural primitive available in the system. Use it as a reference for creating high-fidelity technical reports and academic papers.
</p>

## 0x01: INTERACTIVE_CARTOGRAPHY (D3.js)

Below is an interactive map using D3.js

<div class="bunker-window">
    <div class="window-title"><span>GEOSPATIAL_DIAGNOSTIC</span><span>WGS84_PROJ</span></div>
    <div id="globe-container" class="w-full flex justify-center bg-black py-8"></div>
    <div class="p-4 border-t-2 border-black bg-gray-50 text-[10px] font-mono">
        <strong>REFERENCE:</strong> Countries with a law against werewolves (Marked in Red).
    </div>
</div>

{{< d3js >}}
const width = 500;
const height = 500;
const sensitivity = 75;

const projection = d3.geoOrthographic()
    .scale(200)
    .center([0, 0])
    .rotate([58, 34, 0])
    .translate([width / 2, height / 2]);

const initialScale = projection.scale();
const path = d3.geoPath().projection(projection);

const svg = d3.select("#globe-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("max-width", "100%");

const globe = svg.append("circle")
    .attr("fill", "#0a0a0a")
    .attr("stroke", "#ffcc00")
    .attr("stroke-width", "0.5")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", projection.scale());

const map = svg.append("g");

// Load World Atlas data
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(data => {
    const countries = topojson.feature(data, data.objects.countries);

    // IDs for Argentina (32) and Malvinas (238)
    const highlightedIDs = [32, 238];

    map.selectAll("path")
        .data(countries.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", d => highlightedIDs.includes(parseInt(d.id)) ? "#ff0000" : "#222")
        .attr("stroke", "#444")
        .attr("stroke-width", 0.3)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#ffcc00"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", "#444"); });

    // Drag interaction
    svg.call(d3.drag().on("drag", (event) => {
        const rotate = projection.rotate();
        const k = sensitivity / projection.scale();
        projection.rotate([
            rotate[0] + event.dx * k,
            rotate[1] - event.dy * k
        ]);
        path = d3.geoPath().projection(projection);
        svg.selectAll("path").attr("d", path);
    }));
});
{{< /d3js >}}

## 0x02: LINK_PREVIEWS

The `prev` shortcode allows for rich, non-intrusive link peeking. It can be used in several ways:

1.  **Implicit Parameters:** `{{</* prev "URL" "IMAGE" "LABEL" */>}}`
    {{< prev "https://9p.io/plan9/" "https://9p.io/plan9/img/plan9bunnywhite.jpg" "Plan 9 Archive" >}}

2.  **Explicit Named Parameters:**
    {{< prev URL="https://github.com/nein-ar" TEXT="nein-ar" IMG="https://github.com/nein-ar.png" >}}

3.  **No-Iframe Mode:** (Faster loading, only metadata)
    {{< prev URL="https://github.com/nein-ar" TEXT="nein-ar" NO_IFRAME="true" >}}

## 0x03: COMPUTATIONAL_LOGIC

### 3.1: Mermaid Diagrams
Use the `mermaid` shortcode to insert diagrams.

{{< mermaid >}}
graph TD
    A[Citizen] --> B{Full Moon?}
    B -->|Yes| C[Law Enforced]
    B -->|No| D[Safe]
    style C fill:#f00,color:#fff
{{< /mermaid >}}

### 3.2: Chart.js Visuals
Use the `chart` shortcode to insert pleasing infographics, etc.

{{< chart height="300px" >}}
{
  "type": "radar",
  "data": {
    "labels": ["Silver Resistance", "Agility", "Bite Force", "Stealth", "Endurance"],
    "datasets": [{
      "label": "Average Lycanthrope",
      "data": [10, 85, 95, 70, 90],
      "backgroundColor": "rgba(255, 204, 0, 0.2)",
      "borderColor": "#ffcc00"
    }]
  }
}
{{< /chart >}}

## 0x04: RUNTIME_SCRIPTING

### 4.1: Inline JavaScript
Inject logic directly into your post using the `js` shortcode. This is useful for page-specific DOM manipulations.

```js
{{</* js */>}}
document.addEventListener('DOMContentLoaded', () => {
    const h2s = document.querySelectorAll('h2');
    console.log(`Diagnostic: Found ${h2s.length} top-level segments.`);
});
{{</* /js */>}}
```

{{< js >}}
document.addEventListener('DOMContentLoaded', () => {
    const h2s = document.querySelectorAll('h2');
    console.log(`Diagnostic: Found ${h2s.length} top-level segments.`);
});
{{< /js >}}

---

<div class="doc-center opacity-30 text-[8px] uppercase font-mono mt-16">
    End of Technical Reference // {{ now.Format "2006.01.02" }}
</div>
