    document.addEventListener('DOMContentLoaded', () => {
        const terminalOutput = document.getElementById('terminal-output');
        const commandInput = document.getElementById('command-input');
        const initialPrompt = document.getElementById('initial-prompt');

        // --- Command definitions ---
        const commands = {
            'help': `
                <p>Available commands:</p>
                <ul class="list-disc list-inside pl-4">
                    <li><span class="text-[var(--accent-color)]">about</span> - Display summary about me.</li>
                    <li><span class="text-[var(--accent-color)]">skills</span> - List my technical skills.</li>
                    <li><span class="text-[var(--accent-color)]">experience</span> - Show my work experience.</li>
                    <li><span class="text-[var(--accent-color)]">projects</span> - List my recent projects.</li>
                    <li><span class="text-[var(--accent-color)]">contact</span> - Show my contact information.</li>
                    <li><span class="text-[var(--accent-color)]">clear</span> - Clear the terminal history.</li>
                </ul>
            `,
            'about': `
                <p>An engineering student seeking opportunities in data science and business intelligence. I am proficient in Python and SQL, with experience in data visualization using Power BI, evaluating machine learning models, and building data processing workflows.</p>
            `,
            'skills': `
                <p><span class='text-[var(--terminal-yellow)]'>Languages:</span> Python, C++, SQL, Bash</p>
                <p><span class='text-[var(--terminal-yellow)]'>Frameworks:</span> Django, Flask, Node.js</p>
                <p><span class='text-[var(--terminal-yellow)]'>Libraries:</span> TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas, Matplotlib</p>
                <p><span class='text-[var(--terminal-yellow)]'>Tools:</span> Kubernetes, Docker, GIT, MySQL</p>
                <p><span class='text-[var(--terminal-yellow)]'>Platforms:</span> Linux, AWS, GCP</p>
            `,
            'experience': `
                <div>
                    <p class="text-[var(--terminal-yellow)]">Data Science Intern @ Personate.ai (Feb 2024 - May 2024)</p>
                    <ul class="list-disc list-inside text-[var(--text-secondary)] mt-1 pl-4">
                        <li>Benchmarked LLMs (GPT, BERT) for performance, accuracy, and efficiency.</li>
                        <li>Implemented video steganography to enhance data security.</li>
                        <li>Utilized Google Colab and AWS for scalable data processing and model deployment.</li>
                        <li>Developed an efficient data loader for the Wav2Lip model.</li>
                    </ul>
                </div>
            `,
            'projects': `
                <p><a href="https://react-weather-app-iota-wheat.vercel.app/" target="_blank" class="text-[var(--accent-color)] hover:underline">React-Based Weather App:</a> A weather dashboard built with React, Vite, and the OpenWeatherMap API.</p>
            `,
            'contact': `
                 <p>Let\'s connect! Feel free to reach out.</p>
                 <div class="flex gap-4">
                    <a class="text-[var(--accent-color)] hover:underline" href="mailto:divyanshgupta2003@gmail.com">email</a>
                    <a class="text-[var(--accent-color)] hover:underline" href="https://www.linkedin.com/in/divyanshgupta21" target="_blank">linkedin</a>
                    <a class="text-[var(--accent-color)] hover:underline" href="https://github.com/divyanshg21" target="_blank">github</a>
                </div>
            `,
        };

        const commandHistory = [];
        let historyIndex = -1;
        let isFirstCommand = true;

        // --- Typing simulation for initial message ---
        async function typeText(element, text, speed = 50) {
            return new Promise(resolve => {
                let i = 0;
                function typing() {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typing, Math.random() * speed);
                    } else {
                        resolve();
                    }
                }
                typing();
            });
        }

        // --- Command processing logic ---
        function processCommand(cmd) {
            // On first command, hide initial prompt and show terminal history box
            if (isFirstCommand) {
                if (initialPrompt) initialPrompt.style.display = 'none';
                terminalOutput.classList.add('active');
                isFirstCommand = false;
            }
            
            const cmdLower = cmd.toLowerCase().trim();
            
            if (cmdLower === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            }
            
            const outputLine = document.createElement('div');
            outputLine.innerHTML = `<p><span class="text-[var(--terminal-green)]">$</span> ${cmd}</p>`;

            const response = document.createElement('div');
            response.classList.add('pl-4', 'mb-2', 'text-[var(--text-primary)]');

            if (commands[cmdLower]) {
                response.innerHTML = commands[cmdLower];
            } else {
                response.innerHTML = `<p>Command not found: <span class="text-[var(--terminal-red)]">${cmd}</span>. Type \'help\' for a list of available commands.</p>`;
            }
            
            outputLine.appendChild(response);
            terminalOutput.appendChild(outputLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom

            if (cmd.trim() !== '') {
                commandHistory.unshift(cmd);
                historyIndex = -1;
            }
        }

        // --- Event listener for keyboard input ---
        commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = commandInput.value;
                processCommand(cmd);
                commandInput.value = '';
            } else if (e.key === 'ArrowUp') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = -1;
                    commandInput.value = '';
                }
            }
        });

        // --- Initial welcome sequence ---
        async function startSequence() {
            await typeText(initialPrompt, "Type 'help' to begin.", 40);
            commandInput.disabled = false;
            commandInput.focus();
        }

        startSequence();

        // --- Email link copy-to-clipboard ---
        const emailLink = document.getElementById('email-link');
        if (emailLink) {
            emailLink.addEventListener('click', (e) => {
                e.preventDefault();
                const email = 'divyanshgupta2003@gmail.com';
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = emailLink.textContent;
                    emailLink.textContent = 'Copied!';
                    setTimeout(() => {
                        emailLink.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy email: ', err);
                });
            });
        }
    });