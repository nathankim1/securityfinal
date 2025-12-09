# Supply Chain Attack Simulation: Malicious Dependency Injection

This project models a **Typosquatting Supply Chain Attack** in a "Walled Garden" (isolated network) environment. It demonstrates how an attacker can leverage the `postinstall` lifecycle hook in `npm` to execute arbitrary code and exfiltrate sensitive credentials immediately upon package installation.

**Key Metrics Measured:**

- **Time-to-Exploit ($T_{TE}$):** The time elapsed between `npm install` and data exfiltration.
- **Data Volume ($V_{Exfil}$):** The amount of sensitive data captured during the installation window.

## Repository Structure

```text
├── colurs/                 # The Malicious Package
│   ├── package.json        # Contains the 'postinstall' trigger
│   └── steal_creds.js      # Payload: Scans env vars and POSTs to C2
├── listener.js             # C2 Server: Node.js script to receive stolen data
└── README.md               # This documentation
```

## Architecture

The experiment requires two Virtual Machines (VMs) connected via an isolated Internal Network.

| Role            | IP Address      | Components                   | Description                                                |
| :-------------- | :-------------- | :--------------------------- | :--------------------------------------------------------- |
| **Attacker VM** | `192.168.56.10` | Verdaccio, Listener, Malware | Hosts the fake registry and captures stolen data.          |
| **Victim VM**   | `192.168.56.20` | Target App, Honeytokens      | The developer machine that installs the malicious package. |

## Laboratory Setup

### 1. Create an Attacker/C2 VM, a Victim VM, and connect them via a private network.

### 2. Run Verdaccio (local npm directory) on Attacker VM and have Victim VM use this as the new npm registry.

### 3. In the Attacker VM, publish the 'colurs' package and run the listener.js file to listen to incoming traffic.

### 4. In the Victim VM, add the 'colurs' package. The Attacker VM's output should print sensitive information from the Victim VM.
