/* ==========================================================================
   InkScript Studio - Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const rawTextEditor = document.getElementById('raw-text-editor');
    const notebookTarget = document.getElementById('notebook-content-target');
    const notebookPage = document.getElementById('notebook-page');
    const notebookWrapper = document.getElementById('notebook-wrapper');
    
    // Buttons & Inputs
    const fileInput = document.getElementById('file-input');
    const fileDropzone = document.getElementById('file-dropzone');
    const parsingStatus = document.getElementById('parsing-status');
    const statusText = document.getElementById('status-text');
    const btnLoadDemo = document.getElementById('btn-load-demo');
    const btnClearEditor = document.getElementById('btn-clear-editor');
    const btnTogglePreviewMode = document.getElementById('btn-toggle-preview-mode');
    const controlPanel = document.getElementById('control-panel');
    
    // Zoom Controls
    const btnZoomIn = document.getElementById('btn-zoom-in');
    const btnZoomOut = document.getElementById('btn-zoom-out');
    const btnZoomReset = document.getElementById('btn-zoom-reset');
    const valZoom = document.getElementById('val-zoom');
    let currentZoom = 1.0;

    // Customization Inputs
    const fontSelect = document.getElementById('font-family-select');
    const fontSizeRange = document.getElementById('font-size-range');
    const valFontSize = document.getElementById('val-font-size');
    const lineHeightRange = document.getElementById('line-height-range');
    const valLineHeight = document.getElementById('val-line-height');
    const letterSpacingRange = document.getElementById('letter-spacing-range');
    const valLetterSpacing = document.getElementById('val-letter-spacing');

    const enableSlantJitter = document.getElementById('enable-slant-jitter');
    const jitterIntensityRange = document.getElementById('jitter-intensity-range');
    const enableInkBleed = document.getElementById('enable-ink-bleed');

    // Ink Color Inputs
    const inkBodyColor = document.getElementById('ink-body-color');
    const inkH1Color = document.getElementById('ink-h1-color');
    const inkH3Color = document.getElementById('ink-h3-color');
    const inkHlColor = document.getElementById('ink-hl-color');
    const inkPresetBtns = document.querySelectorAll('.ink-preset-btn');

    // Paper & Decoration Inputs
    const paperRadioBtns = document.querySelectorAll('input[name="paper-style"]');
    const binderSelect = document.getElementById('binder-style-select');
    const enableMarginLine = document.getElementById('enable-margin-line');
    const enableStains = document.getElementById('enable-stains');
    const coffeeStainElement = document.getElementById('coffee-stain-element');

    // Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Export Elements
    const btnExportMain = document.getElementById('btn-export-main');
    const exportMenu = document.getElementById('export-menu');
    const exportPng = document.getElementById('export-png');
    const exportPdf = document.getElementById('export-pdf');
    const exportPrint = document.getElementById('export-print');

    // ==========================================================================
    // DEMO NOTES DATA (Norman's 7 Stages, Gulf of Evaluation/Execution, Paradox)
    // ==========================================================================
    const DEMO_MARKDOWN = `# 📝 MID-SEMESTER EXAM NOTES
**Course: Humanities and Design | Weightage: 30%**

---

## 📌 Q.1: Don Norman's Seven Stages of Action
**Question Summary:** Analyze the importance of goal setting at each stage of Norman's 7 Stages of Action. How does it impact UX, decision-making, and project success? Provide examples.

### 1. Don Norman's Seven Stages & Role of Goal Setting
Don Norman’s model breaks down human interaction with a system into seven discrete stages divided into two main phases: ==Execution== (doing something) and ==Evaluation== (checking what happened).

[diagram: Execution vs Evaluation Gulf]

**Setting clear goals at each stage guides user action:**
1. **Forming the Goal:** The primary outcome the user wants to achieve. *Role:* Sets the foundation. If misaligned, interaction fails.
2. **Forming the Intention (Planning):** Translating the high-level goal into a strategy. *Role:* Keeps actions focused on achievable steps.
3. **Specifying the Action Sequence:** Deciding on precise physical actions. *Role:* Minimizes mental effort (cognitive load).
4. **Executing the Action:** Physically performing the action. *Role:* Ensures precise physical input through clear affordances.
5. **Perceiving the State of the World:** Sensing system's reaction. *Role:* Provides immediate feedback mechanisms.
6. **Interpreting the System State:** Making sense of the feedback. *Role:* Presents clear information without ambiguity.
7. **Evaluating the Outcome:** Comparing new state against original goal. *Role:* Confirms whether the original goal was met.

### 2. Impact on UX, Decision-Making, and Project Success
- **User Experience (UX):** Reduces friction across both gulfs. Users feel confident and in control when goals match system feedback.
- **Decision-Making:** Eliminates option paralysis. Users choose correct UI paths without guesswork.
- **Project Success:** Prevents feature creep. Components directly serve user goals, resulting in higher retention.

### 3. Practical Example: Booking a Ride (e.g., Uber)
- **Goal:** Get to the office on time.
- **Intention/Plan:** Use ride-hailing app to book nearby car.
- **Specifying:** Enter destination and select vehicle category.
- **Performing:** Tap "Confirm Booking".
- **Perceiving:** Seeing loading screen & map display.
- **Interpreting:** Recognizing driver's name & arrival time.
- **Evaluating:** Confirming driver is assigned and arriving in 3 mins.

==Impact:== If the app fails to show arrival time (Perceiving/Interpreting), the user cannot complete the Evaluating stage, leading to ride cancellation.

---

## 📌 Q.2: Gulf of Evaluation vs Execution (Elderly User Scenario)

### 1. Conceptual Framework
| Aspect | Gulf of Execution | Gulf of Evaluation |
| Definition | Gap between user's goal and system actions required. | Gap between system's response and user's ability to interpret it. |
| Core Question | *"How do I operate this?"* | *"Did it do what I wanted?"* |
| Design Focus | Clear affordances, signifiers, minimal steps. | Clear feedback, status displays, verification. |

### 2. Scenario Analysis: Elderly User & New Health App
**Profile:** Elderly person, no prior smartphone experience, lower visual acuity.
**Goal:** Record daily blood pressure.

[box: Elderly User's Goal: "Record Blood Pressure"]

#### A. Gulf of Execution (Taking Action)
- **Obstacles:** App uses an unlabeled small "+" button. Input fields have low-contrast placeholder text.
- **Outcome:** High interaction barrier. User experiences frustration and gives up.

#### B. Gulf of Evaluation (Understanding Feedback)
- **Obstacles:** After tapping "Save", app navigates back without visual/audio confirmation. Readings hidden in a nested "Historical Log".
- **Outcome:** High cognitive burden. User is uncertain if reading was saved, causing duplicate entries or abandonment.

### 3. Design Recommendations
- **Bridge Execution:** Use explicit text labels (e.g., *"Tap Here to Enter BP"*). Implement wizard forms with large fonts.
- **Bridge Evaluation:** Provide direct feedback (green checkmark: *"Success!"*). Play an audible confirmation tone.

---

## 📌 Q.3: The Paradox of Technology

### 1. The Paradox Defined (Don Norman)
The same technology that simplifies life by providing more features also increases complexity, making devices harder to learn.

[formula: Increased Features ➔ Increased Capability ➔ Increased Complexity]

### 2. Manifestation & Impact on Users
- **Everyday Frustrations:**
  - ==Feature Overload== (e.g., washing machines with dozens of obscure presets).
  - ==Ambiguous Controls== (single buttons doing multiple tasks based on long/short presses).
- **Impact on Behavior:**
  - ==Cognitive Overload:== Mental fatigue from memorizing menus.
  - ==Helplessness/Anxiety:== Users blame themselves for bad design.
  - ==Feature Avoidance:== Users stick to 1 out of 20 settings, making advanced features redundant.

### 3. Case Studies
| Device / Feature | Unexpected Complication (Reality) | Contrast (Intended vs Actual) |
| **Smart TV Remote** (Minimalist) | Basic tasks like switching inputs require navigating 4 sub-menus. | **Intended:** Simple control.<br>**Actual:** Increased navigation steps. |
| **Touchscreens in Cars** | Drivers must take eyes off road to adjust AC (no tactile buttons). | **Intended:** Streamlined dashboard.<br>**Actual:** Safety hazards & high cognitive load. |
| **Smart Wi-Fi Microwave** | Heating milk requires opening an app or navigating digital non-tactile screens. | **Intended:** Automation/Convenience.<br>**Actual:** Simple tasks become slower. |

### 4. Mitigation Strategies for Designers
1. **Progressive Disclosure:** Keep high-frequency controls visible; hide advanced settings in secondary menus.
2. **Physical Affordances:** Retain physical knobs/buttons for safety-critical tasks (car AC).
3. **Human-Centered Design (HCD):** Balance functional capability with simplicity to ensure core usability is never compromised.

---
**- End of Notes. Good luck! -**
`;

    // Initialize with Demo Notes
    rawTextEditor.value = DEMO_MARKDOWN;
    renderMarkdownToNotebook(DEMO_MARKDOWN);

    // ==========================================================================
    // TAB NAVIGATION
    // ==========================================================================
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetPane = document.getElementById(btn.dataset.tab);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // ==========================================================================
    // MARKDOWN TO HANDWRITTEN DOM COMPILER
    // ==========================================================================
    function renderMarkdownToNotebook(markdownText) {
        if (!markdownText) {
            notebookTarget.innerHTML = '<p><em>Empty note page. Type in the Live Editor or import a document to get started.</em></p>';
            return;
        }

        const lines = markdownText.split('\n');
        let htmlBuffer = '';
        let inList = false;
        let listType = 'ul';
        let inTable = false;
        let tableRows = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            // Close table if line is not a table row
            if (inTable && !line.startsWith('|')) {
                htmlBuffer += compileTable(tableRows);
                inTable = false;
                tableRows = [];
            }

            // Close list if line is not a list item
            if (inList && !line.match(/^(\*|-|\+|\d+\.)\s+/)) {
                htmlBuffer += `</${listType}>`;
                inList = false;
            }

            if (line === '') {
                continue;
            }

            // Horizontal Rule
            if (line === '---' || line === '***') {
                htmlBuffer += '<br><hr style="border: 1px dashed #91d1d3; margin: 20px 0;"><br>';
                continue;
            }

            // Headings
            if (line.startsWith('# ')) {
                htmlBuffer += `<h1>${parseInline(line.substring(2))}</h1>`;
                continue;
            }
            if (line.startsWith('## ')) {
                htmlBuffer += `<h2>${parseInline(line.substring(3))}</h2>`;
                continue;
            }
            if (line.startsWith('### ')) {
                htmlBuffer += `<h3>${parseInline(line.substring(4))}</h3>`;
                continue;
            }
            if (line.startsWith('#### ')) {
                htmlBuffer += `<h4 style="font-size: 1.05em; color: var(--ink-h3); margin-top: 1em;">${parseInline(line.substring(5))}</h4>`;
                continue;
            }

            // Callout Box `[box: text]`
            if (line.startsWith('[box:') && line.endsWith(']')) {
                const text = line.substring(5, line.length - 1).trim();
                htmlBuffer += `<div class="box">${parseInline(text)}</div>`;
                continue;
            }

            // Formula Box `[formula: text]`
            if (line.startsWith('[formula:') && line.endsWith(']')) {
                const text = line.substring(9, line.length - 1).trim();
                htmlBuffer += `<div class="formula">${parseInline(text)}</div>`;
                continue;
            }

            // Diagram `[diagram: title]`
            if (line.startsWith('[diagram:') && line.endsWith(']')) {
                const title = line.substring(9, line.length - 1).trim();
                htmlBuffer += renderFlowDiagram(title);
                continue;
            }

            // Hand-drawn Table row `| col1 | col2 |`
            if (line.startsWith('|')) {
                inTable = true;
                tableRows.push(line);
                continue;
            }

            // Lists (Unordered or Numbered)
            const listMatch = line.match(/^(\*|-|\+|\d+\.)\s+(.*)/);
            if (listMatch) {
                const isNumbered = /^\d+\./.test(listMatch[1]);
                const newType = isNumbered ? 'ol' : 'ul';

                if (!inList || listType !== newType) {
                    if (inList) htmlBuffer += `</${listType}>`;
                    htmlBuffer += `<${newType}>`;
                    inList = true;
                    listType = newType;
                }
                htmlBuffer += `<li>${parseInline(listMatch[2])}</li>`;
                continue;
            }

            // Paragraph
            htmlBuffer += `<p>${parseInline(line)}</p>`;
        }

        // Close trailing tags
        if (inList) htmlBuffer += `</${listType}>`;
        if (inTable) htmlBuffer += compileTable(tableRows);

        notebookTarget.innerHTML = htmlBuffer;

        // Apply Slant / Jitter effect if enabled
        if (enableSlantJitter.checked) {
            applyJitterEffect();
        }
    }

    function parseInline(text) {
        return text
            // Highlight `==text==`
            .replace(/==(.*?)==/g, '<span class="highlight">$1</span>')
            // Bold `**text**`
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic `*text*`
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    function compileTable(rows) {
        if (rows.length === 0) return '';
        let tableHtml = '<table>';
        
        rows.forEach((rowStr, idx) => {
            const cells = rowStr.split('|').map(c => c.trim()).filter((c, i, a) => i > 0 && i < a.length - 1);
            if (cells.length === 0) return;
            
            // Skip markdown separator row `|---|---|`
            if (cells.every(c => /^:?-+:?$/.test(c))) return;

            const tag = idx === 0 ? 'th' : 'td';
            tableHtml += '<tr>';
            cells.forEach(cellText => {
                tableHtml += `<${tag}>${parseInline(cellText)}</${tag}>`;
            });
            tableHtml += '</tr>';
        });

        tableHtml += '</table>';
        return tableHtml;
    }

    function renderFlowDiagram(title) {
        return `
            <div class="diagram">
                <div class="box" style="font-size: 1.1em;">${title || 'System Interaction Flow'}</div>
                <div class="arrow-down"></div>
                <div class="diagram-flow">
                    <div class="diagram-column">
                        <strong style="color: var(--ink-h1);">EXECUTION GULF</strong>
                        <div class="box">Action Strategy</div>
                        <div class="arrow-down"></div>
                        <div style="font-size: 0.85em; background: #fff; padding: 4px 8px; border: 1px dotted red; border-radius:4px;">
                            Physical Operations & Signifiers
                        </div>
                    </div>
                    <div class="diagram-column">
                        <strong style="color: var(--ink-h1);">EVALUATION GULF</strong>
                        <div class="box">System Feedback</div>
                        <div class="arrow-up"></div>
                        <div style="font-size: 0.85em; background: #fff; padding: 4px 8px; border: 1px dotted green; border-radius:4px;">
                            Perception & Interpretation
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // ==========================================================================
    // HUMAN HANDWRITING SLANT & JITTER ENGINE
    // ==========================================================================
    function applyJitterEffect() {
        const intensity = parseInt(jitterIntensityRange.value) || 2;
        const angleMax = intensity === 1 ? 0.8 : (intensity === 2 ? 1.6 : 2.5);
        const yShiftMax = intensity === 1 ? 0.5 : (intensity === 2 ? 1.2 : 2.0);

        // Target paragraph, list item, and heading text nodes
        const textContainers = notebookTarget.querySelectorAll('p, li, th, td, h1, h2, h3');
        
        textContainers.forEach(container => {
            // Avoid re-processing if already jittered or contains complex HTML boxes
            if (container.querySelector('.box') || container.querySelector('table')) return;

            const childNodes = Array.from(container.childNodes);
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0) {
                    const words = node.nodeValue.split(/(\s+)/);
                    const fragment = document.createDocumentFragment();

                    words.forEach(word => {
                        if (word.trim().length === 0) {
                            fragment.appendChild(document.createTextNode(word));
                        } else {
                            const span = document.createElement('span');
                            span.className = 'jitter-word';
                            span.textContent = word;
                            
                            // Generate subtle random rotation and vertical translation
                            const angle = (Math.random() * (angleMax * 2) - angleMax).toFixed(2);
                            const yShift = (Math.random() * (yShiftMax * 2) - yShiftMax).toFixed(2);
                            
                            span.style.transform = `rotate(${angle}deg) translateY(${yShift}px)`;
                            fragment.appendChild(span);
                        }
                    });

                    container.replaceChild(fragment, node);
                }
            });
        });
    }

    // Live Sync Editor -> Notebook Page
    rawTextEditor.addEventListener('input', () => {
        renderMarkdownToNotebook(rawTextEditor.value);
    });

    // Live Sync Notebook Page -> Editor (ContentEditable)
    notebookTarget.addEventListener('input', () => {
        // Back sync simple text edits if user directly edits on canvas
    });

    // ==========================================================================
    // DOCUMENT PARSER & UPLOAD HANDLERS
    // ==========================================================================

    // Drag and Drop
    fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('dragover');
    });

    fileDropzone.addEventListener('dragleave', () => {
        fileDropzone.classList.remove('dragover');
    });

    fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });

    function handleFileUpload(file) {
        showParsingStatus(`Reading ${file.name}...`);
        const ext = file.name.split('.').pop().toLowerCase();

        if (ext === 'txt' || ext === 'md' || ext === 'json') {
            const reader = new FileReader();
            reader.onload = (evt) => {
                const text = evt.target.result;
                rawTextEditor.value = text;
                renderMarkdownToNotebook(text);
                hideParsingStatus();
                switchToEditorTab();
            };
            reader.readAsText(file);
        }
        else if (ext === 'docx') {
            if (!window.mammoth) {
                alert('Mammoth.js library failed to load.');
                hideParsingStatus();
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                window.mammoth.extractRawText({ arrayBuffer: evt.target.result })
                    .then(result => {
                        const formattedText = formatExtractedText(result.value, file.name);
                        rawTextEditor.value = formattedText;
                        renderMarkdownToNotebook(formattedText);
                        hideParsingStatus();
                        switchToEditorTab();
                    })
                    .catch(err => {
                        alert('Error parsing Word document: ' + err.message);
                        hideParsingStatus();
                    });
            };
            reader.readAsArrayBuffer(file);
        }
        else if (ext === 'pdf') {
            if (!window.pdfjsLib) {
                alert('PDF.js library failed to load.');
                hideParsingStatus();
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                const typedarray = new Uint8Array(evt.target.result);
                window.pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                    let fullText = `# 📝 Notes: ${file.name.replace('.pdf', '')}\n\n`;
                    let numPages = pdf.numPages;
                    let count = 0;

                    for (let i = 1; i <= numPages; i++) {
                        pdf.getPage(i).then(page => {
                            page.getTextContent().then(textContent => {
                                fullText += `\n## Page ${i}\n`;
                                textContent.items.forEach(item => {
                                    fullText += item.str + ' ';
                                });
                                count++;
                                if (count === numPages) {
                                    rawTextEditor.value = fullText;
                                    renderMarkdownToNotebook(fullText);
                                    hideParsingStatus();
                                    switchToEditorTab();
                                }
                            });
                        });
                    }
                }).catch(err => {
                    alert('Error reading PDF: ' + err.message);
                    hideParsingStatus();
                });
            };
            reader.readAsArrayBuffer(file);
        }
        else if (ext === 'pptx') {
            if (!window.JSZip) {
                alert('JSZip library failed to load.');
                hideParsingStatus();
                return;
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                window.JSZip.loadAsync(evt.target.result).then(zip => {
                    let slideFiles = Object.keys(zip.files).filter(filename => /^ppt\/slides\/slide\d+\.xml$/.test(filename));
                    slideFiles.sort((a, b) => {
                        const numA = parseInt(a.match(/\d+/)[0]);
                        const numB = parseInt(b.match(/\d+/)[0]);
                        return numA - numB;
                    });

                    let pptxText = `# 📊 Presentation Notes: ${file.name.replace('.pptx', '')}\n\n`;
                    let promises = slideFiles.map((filename, index) => {
                        return zip.files[filename].async("text").then(xmlText => {
                            const parser = new DOMParser();
                            const xmlDoc = parser.parseFromString(xmlText, "text/xml");
                            const textNodes = xmlDoc.getElementsByTagName("a:t");
                            let slideContent = '';
                            for (let i = 0; i < textNodes.length; i++) {
                                slideContent += textNodes[i].textContent + ' ';
                            }
                            return `\n## Slide ${index + 1}\n${slideContent.trim()}\n`;
                        });
                    });

                    Promise.all(promises).then(slideTexts => {
                        pptxText += slideTexts.join('\n');
                        rawTextEditor.value = pptxText;
                        renderMarkdownToNotebook(pptxText);
                        hideParsingStatus();
                        switchToEditorTab();
                    });
                }).catch(err => {
                    alert('Error parsing PowerPoint PPTX: ' + err.message);
                    hideParsingStatus();
                });
            };
            reader.readAsArrayBuffer(file);
        }
        else {
            alert('Unsupported file format. Please upload .txt, .docx, .pdf, .pptx, or .md files.');
            hideParsingStatus();
        }
    }

    function formatExtractedText(rawText, filename) {
        const title = filename ? filename.replace(/\.[^/.]+$/, '') : 'Document Notes';
        return `# 📝 Notes: ${title}\n\n` + rawText.split('\n\n').map(para => para.trim()).filter(p => p.length > 0).join('\n\n');
    }

    function showParsingStatus(msg) {
        statusText.textContent = msg;
        parsingStatus.style.display = 'flex';
    }

    function hideParsingStatus() {
        parsingStatus.style.display = 'none';
    }

    function switchToEditorTab() {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        const editorTabBtn = document.querySelector('.tab-btn[data-tab="tab-editor"]');
        const editorPane = document.getElementById('tab-editor');
        if (editorTabBtn && editorPane) {
            editorTabBtn.classList.add('active');
            editorPane.classList.add('active');
        }
    }

    // Toolbar Buttons Insertion into Editor
    document.querySelectorAll('.tb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            let insertText = '';
            
            if (tag === 'h1') insertText = '# Main Title\n';
            if (tag === 'h2') insertText = '## Section Heading\n';
            if (tag === 'h3') insertText = '### Subheading\n';
            if (tag === 'bold') insertText = '**Bold Text**';
            if (tag === 'hl') insertText = '==Highlighted Text==';
            if (tag === 'box') insertText = '[box: Key Concept Box]\n';
            if (tag === 'formula') insertText = '[formula: E = mc^2]\n';
            if (tag === 'diagram') insertText = '[diagram: Flowchart Process]\n';
            if (tag === 'table') insertText = '\n| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n';

            const startPos = rawTextEditor.selectionStart;
            const endPos = rawTextEditor.selectionEnd;
            rawTextEditor.value = rawTextEditor.value.substring(0, startPos) + insertText + rawTextEditor.value.substring(endPos);
            rawTextEditor.focus();
            renderMarkdownToNotebook(rawTextEditor.value);
        });
    });

    // Template Cards Click
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const templateType = card.dataset.template;
            if (templateType === 'exam') {
                rawTextEditor.value = DEMO_MARKDOWN;
            } else if (templateType === 'lecture') {
                rawTextEditor.value = `# 🎓 LECTURE SUMMARY: COMPUTER SCIENCE 101\n**Topic: Data Structures & Algorithms**\n\n## 📌 Key Definitions\n- **Algorithm:** Step-by-step procedure for solving a problem.\n- **Data Structure:** Organized format for storing and managing data.\n\n### Big-O Time Complexities\n| Operation | Array | Linked List | Hash Table |\n| Access | O(1) | O(n) | O(1) |\n| Search | O(n) | O(n) | O(1) |\n| Insertion | O(n) | O(1) | O(1) |\n\n[box: Always choose Data Structures based on access patterns!]`;
            } else if (templateType === 'formula') {
                rawTextEditor.value = `# 📐 PHYSICS & MATH FORMULA SHEET\n\n## ⚡ Newton's Laws & Mechanics\n\n[formula: F = m \\cdot a]\n\n[formula: E_k = \\frac{1}{2}m v^2]\n\n### Einstein's Mass-Energy Equivalence\n[formula: E = m c^2]\n\n==Remember: Energy is always conserved in an isolated system!==`;
            }
            renderMarkdownToNotebook(rawTextEditor.value);
            switchToEditorTab();
        });
    });

    // Load Demo Notes Button
    btnLoadDemo.addEventListener('click', () => {
        rawTextEditor.value = DEMO_MARKDOWN;
        renderMarkdownToNotebook(DEMO_MARKDOWN);
    });

    btnClearEditor.addEventListener('click', () => {
        if (confirm('Clear all text from editor?')) {
            rawTextEditor.value = '';
            renderMarkdownToNotebook('');
        }
    });

    btnTogglePreviewMode.addEventListener('click', () => {
        controlPanel.classList.toggle('collapsed');
    });

    // ==========================================================================
    // CUSTOMIZATION & TYPOGRAPHY EVENT HANDLERS
    // ==========================================================================
    function updateRuleHeight() {
        const fSize = parseFloat(fontSizeRange.value) || 19;
        const lHeight = parseFloat(lineHeightRange.value) || 1.6;
        const rulePx = fSize * lHeight;
        document.documentElement.style.setProperty('--rule-height', rulePx + 'px');
    }

    fontSelect.addEventListener('change', () => {
        document.documentElement.style.setProperty('--handwriting-font', fontSelect.value);
        updateRuleHeight();
    });

    fontSizeRange.addEventListener('input', () => {
        const val = fontSizeRange.value + 'px';
        valFontSize.textContent = val;
        document.documentElement.style.setProperty('--font-size-base', val);
        updateRuleHeight();
    });

    lineHeightRange.addEventListener('input', () => {
        valLineHeight.textContent = lineHeightRange.value;
        document.documentElement.style.setProperty('--line-height-base', lineHeightRange.value);
        updateRuleHeight();
    });

    // Initialize rule height on start
    updateRuleHeight();

    letterSpacingRange.addEventListener('input', () => {
        const val = letterSpacingRange.value + 'px';
        valLetterSpacing.textContent = val;
        document.documentElement.style.setProperty('--letter-spacing-base', val);
    });

    const baselineOffsetRange = document.getElementById('baseline-offset-range');
    const valBaselineOffset = document.getElementById('val-baseline-offset');

    if (baselineOffsetRange) {
        baselineOffsetRange.addEventListener('input', () => {
            const factor = parseFloat(baselineOffsetRange.value) / 100;
            if (valBaselineOffset) valBaselineOffset.textContent = baselineOffsetRange.value + '%';
            document.documentElement.style.setProperty('--line-offset-factor', factor);
        });
    }

    enableSlantJitter.addEventListener('change', () => {
        renderMarkdownToNotebook(rawTextEditor.value);
    });

    jitterIntensityRange.addEventListener('input', () => {
        const levels = ['Low', 'Medium', 'High'];
        document.getElementById('val-jitter-intensity').textContent = levels[jitterIntensityRange.value - 1];
        if (enableSlantJitter.checked) {
            renderMarkdownToNotebook(rawTextEditor.value);
        }
    });

    enableInkBleed.addEventListener('change', () => {
        if (enableInkBleed.checked) {
            notebookPage.classList.add('ink-bleed-active');
        } else {
            notebookPage.classList.remove('ink-bleed-active');
        }
    });

    // Ink Preset Color Schemes
    const INK_PRESETS = {
        'classic-blue': { body: '#1a1a6b', h1: '#b30000', h3: '#006600', hl: 'rgba(255, 255, 0, 0.4)' },
        'midnight': { body: '#0f2b48', h1: '#8b0000', h3: '#2e7d32', hl: 'rgba(255, 235, 59, 0.4)' },
        'sepia': { body: '#3e2723', h1: '#bf360c', h3: '#1b5e20', hl: 'rgba(255, 204, 128, 0.5)' },
        'charcoal': { body: '#212121', h1: '#d32f2f', h3: '#388e3c', hl: 'rgba(255, 241, 118, 0.5)' }
    };

    inkPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            inkPresetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const scheme = INK_PRESETS[btn.dataset.scheme];
            if (scheme) {
                inkBodyColor.value = scheme.body;
                inkH1Color.value = scheme.h1;
                inkH3Color.value = scheme.h3;
                updateInkColors();
            }
        });
    });

    function updateInkColors() {
        document.documentElement.style.setProperty('--ink-body', inkBodyColor.value);
        document.documentElement.style.setProperty('--ink-h1', inkH1Color.value);
        document.documentElement.style.setProperty('--ink-h3', inkH3Color.value);
        document.documentElement.style.setProperty('--ink-hl', inkHlColor.value);
    }

    [inkBodyColor, inkH1Color, inkH3Color, inkHlColor].forEach(picker => {
        picker.addEventListener('input', updateInkColors);
    });

    // Paper Styles Selector
    paperRadioBtns.forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.paper-card').forEach(c => c.classList.remove('active'));
            radio.closest('.paper-card').classList.add('active');

            notebookPage.classList.remove('paper-ruled', 'paper-grid', 'paper-dot', 'paper-parchment', 'paper-legal', 'paper-blank');
            notebookPage.classList.add(`paper-${radio.value}`);
        });
    });

    // Binder Style Selector
    binderSelect.addEventListener('change', () => {
        notebookPage.classList.remove('binder-left-holes', 'binder-top-holes', 'binder-none');
        if (binderSelect.value !== 'none') {
            notebookPage.classList.add(`binder-${binderSelect.value}`);
        }
    });

    enableMarginLine.addEventListener('change', () => {
        if (enableMarginLine.checked) {
            notebookPage.classList.add('has-margin');
        } else {
            notebookPage.classList.remove('has-margin');
        }
    });

    enableStains.addEventListener('change', () => {
        coffeeStainElement.style.display = enableStains.checked ? 'block' : 'none';
    });

    // Initial Margin setup
    notebookPage.classList.add('has-margin');

    // ==========================================================================
    // ZOOM CONTROLS
    // ==========================================================================
    btnZoomIn.addEventListener('click', () => {
        if (currentZoom < 1.6) {
            currentZoom += 0.1;
            applyZoom();
        }
    });

    btnZoomOut.addEventListener('click', () => {
        if (currentZoom > 0.6) {
            currentZoom -= 0.1;
            applyZoom();
        }
    });

    btnZoomReset.addEventListener('click', () => {
        currentZoom = 1.0;
        applyZoom();
    });

    function applyZoom() {
        notebookWrapper.style.transform = `scale(${currentZoom})`;
        valZoom.textContent = Math.round(currentZoom * 100) + '%';
    }

    // ==========================================================================
    // EXPORT HANDLERS
    // ==========================================================================
    btnExportMain.addEventListener('click', (e) => {
        e.stopPropagation();
        exportMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        exportMenu.classList.remove('show');
    });

    // Export as PNG
    exportPng.addEventListener('click', (e) => {
        e.preventDefault();
        if (!window.html2canvas) {
            alert('html2canvas library failed to load.');
            return;
        }

        // Temporary zoom reset for crisp screenshot
        const savedTransform = notebookWrapper.style.transform;
        notebookWrapper.style.transform = 'scale(1)';

        window.html2canvas(notebookPage, {
            scale: 2,
            useCORS: true,
            backgroundColor: null
        }).then(canvas => {
            notebookWrapper.style.transform = savedTransform;
            const link = document.createElement('a');
            link.download = 'handwritten-notes.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            notebookWrapper.style.transform = savedTransform;
            alert('PNG Export error: ' + err.message);
        });
    });

    // Export as PDF
    exportPdf.addEventListener('click', (e) => {
        e.preventDefault();
        if (!window.html2pdf) {
            alert('html2pdf library failed to load.');
            return;
        }

        const savedTransform = notebookWrapper.style.transform;
        notebookWrapper.style.transform = 'scale(1)';

        const opt = {
            margin: 0,
            filename: 'handwritten-notes.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        window.html2pdf().set(opt).from(notebookPage).save().then(() => {
            notebookWrapper.style.transform = savedTransform;
        }).catch(err => {
            notebookWrapper.style.transform = savedTransform;
            alert('PDF Export error: ' + err.message);
        });
    });

    // Print Notebook
    exportPrint.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
    });

    // ==========================================================================
    // MOBILE SWITCHER ENGINE
    // ==========================================================================
    const mBtnControls = document.getElementById('m-btn-controls');
    const mBtnPreview = document.getElementById('m-btn-preview');
    const appWorkspace = document.querySelector('.app-workspace');

    if (mBtnControls && mBtnPreview && appWorkspace) {
        // Only add mobile toggle classes on mobile-sized screens
        function initMobileState() {
            if (window.innerWidth <= 900) {
                if (!appWorkspace.classList.contains('show-controls') && !appWorkspace.classList.contains('show-preview')) {
                    appWorkspace.classList.add('show-controls');
                }
            } else {
                appWorkspace.classList.remove('show-controls', 'show-preview');
            }
        }
        initMobileState();
        window.addEventListener('resize', initMobileState);

        mBtnControls.addEventListener('click', () => {
            mBtnControls.classList.add('active');
            mBtnPreview.classList.remove('active');
            appWorkspace.classList.remove('show-preview');
            appWorkspace.classList.add('show-controls');
        });

        mBtnPreview.addEventListener('click', () => {
            mBtnPreview.classList.add('active');
            mBtnControls.classList.remove('active');
            appWorkspace.classList.remove('show-controls');
            appWorkspace.classList.add('show-preview');
        });
    }

});
