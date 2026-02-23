const urls = [
      '"/uploads/coverImages-1771146835889-322344418.jpg,/uploads/coverImages-1771146835891-386026259.jpg"',
      '["/uploads/service-up-1771713174141-99546026.png"]',
      '["/uploads/service-1771716382487-254630009.jpg"]'
];

function parseImageVal(val) {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
            try {
                  // First try standard JSON parse (handles the JSON array case perfectly)
                  const parsed = JSON.parse(val);
                  if (Array.isArray(parsed)) return parsed;
                  if (typeof parsed === "string") {
                        // handle double stringified arrays
                        try {
                              const doubleParsed = JSON.parse(parsed);
                              if (Array.isArray(doubleParsed)) return doubleParsed;
                        } catch (e) { }
                        // If still string, maybe it's comma separated
                        return parsed.split(",").map(s => s.trim()).filter(Boolean);
                  }
            } catch (err) {
                  // Fallback: it's some other format, like comma separated
                  let clean = val.replace(/^["'\[]+|["'\]]+$/g, ""); // Strip outer brackets and quotes
                  return clean.split(",").map(s => s.trim()).filter(Boolean);
            }
      }
      return [];
}

urls.forEach(u => console.log(parseImageVal(u)));
