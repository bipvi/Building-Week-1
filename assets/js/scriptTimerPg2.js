 // Impostazioni
 const width = 140;
 const height = 140;
 const radius = Math.min(width, height) / 2 - 10;
 const arcThickness = 7; // Spessore dell'arco

 // Creare l'elemento SVG
 const svg = d3.select("#timer")
     .append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", `translate(${width / 2}, ${height / 2})`);

 // Funzione per l'arco
 const arc = d3.arc()
     .innerRadius(radius - arcThickness * 1)
     .outerRadius(radius + arcThickness / 1)
     .startAngle(0);

 // Arco di sfondo
 svg.append("path")
     .datum({ endAngle: 2 * Math.PI })
     .attr("fill", "#6e5773")
     .attr("d", arc);

 // Elemento arco per il progresso
 const progress = svg.append("path")
     .datum({ endAngle: 0 })
     .attr("fill", "#00e5ff")
     .attr("d", arc);

 // Testo al centro del cerchio
 const timeText = svg.append("text")
     .attr("dy", "-2.4em")
     .attr("font-size", "10px")
     .text("SECONDS");

 const remainingText = svg.append("text")
     .attr("dy", "3.2em")
     .attr("font-size", "10px")
     .text("REMAINING");

 const secondsText = svg.append("text")
     .attr("dy", "0.35em")
     .attr("font-size", "3em");

 // Funzione per l'animazione
 function updateProgress(elapsed) {
     const endAngle = - (elapsed / duration) * 2 * Math.PI;
     progress.datum({ endAngle: endAngle })
         .attr("d", arc);
     secondsText.text(`${Math.ceil(duration - elapsed)}`);
 }

 // Avviare il timer
 let startTime = Date.now();
 d3.timer(function () {
     let elapsed = (Date.now() - startTime) / 1000;
     if (elapsed > duration) elapsed = duration;
     updateProgress(elapsed);
     if (elapsed === duration) return true;
 });

