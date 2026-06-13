# **AQUATIC LABS PROJECT LIST**

## **STANDOUTS**

### **Agentic Debugging Extension for VSCode and MCP**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Built an internal VSCode extension and MCP server that connected debugger context directly into agent workflows.  
* Passed call stack, local variables, breakpoints, launch configuration, and file context into agent sessions for deeper codebase understanding.  
* Enabled agents to run `launch.json`, set breakpoints, and reason through poorly documented legacy code in live debugger sessions.  
* Developed the extension and MCP tooling in TypeScript for use with Cursor, GitHub Copilot, and other VSCode-compatible agent workflows.  
* Improved developer productivity by reducing manual context transfer and accelerating debugging across large internal repositories.

### **Customer-Facing Sensor Data Platform and API Access Layer**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Rebuilt the customer application from an early GitHub Pages dashboard into a full stack customer-facing platform.  
* Developed customer assignment workflows that linked users to sensors, issue tracking, historical data, and real-time data views.  
* Built headless data access through REST API and webhook integrations so customers could consume sensor data directly.  
* Implemented the application using React, JavaScript, Python, npm, and Supabase.  
* Improved customer visibility into sensor performance while reducing manual reporting and expanding external access to production data.

### **Embedded C++ Sensor Algorithm for On-Device Alkalinity Computation**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Converted a cloud-hosted Python alkalinity algorithm into an embedded C++ implementation that could run directly on the device.  
* Moved computation onto the embedded controller to support offline customer deployments and reduce exposure of proprietary cloud logic.  
* Optimized memory usage by replacing dynamic vectors and mappings with statically typed arrays and constrained data structures.  
* Validated parity between Python and C++ outputs, with slight type-driven output differences remaining within decimal-percentage tolerances.  
* Strengthened deployment security by enabling encrypted on-device execution of core sensor computation logic.

---

# **FULL STACK / CUSTOMER PRODUCTS**

### **Customer-Facing Sensor Data Platform and API Access Layer**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Rebuilt the customer application from an early GitHub Pages dashboard into a full stack customer-facing platform.  
* Developed customer assignment workflows that linked users to sensors, issue tracking, historical data, and real-time data views.  
* Built headless data access through REST API and webhook integrations so customers could consume sensor data directly.  
* Implemented the application using React, JavaScript, Python, npm, and Supabase.  
* Improved customer visibility into sensor performance while reducing manual reporting and expanding external access to production data.

### **Real-Time Internal Sensor Dashboard with Redis Caching**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Built Redis caching into the internal sensor UI to improve interactivity and reduce direct database query load.  
* Cached high-frequency sensor data from multiple devices publishing across several tables at 10Hz.  
* Implemented an hour-long Redis holding layer with broadcast fanout to serve internal users more efficiently.  
* Reduced multi-session dashboard load times from roughly 20 seconds to roughly 2 seconds for 15-minute sensor views.  
* Improved internal dashboard responsiveness, reduced database pressure, and supported smoother real-time monitoring workflows.

---

# **DATA INFRASTRUCTURE / DATABASE OPTIMIZATION**

### **Scalable TimescaleDB Hypertable Architecture for Sensor Telemetry**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Rebuilt the custom TimescaleDB hypertabled Postgres database for improved scalability and long-term storage performance.  
* Designed schemas for sensor readings, aggregate computations, and calibration metrics across production sensor deployments.  
* Implemented schema redesigns, table abstraction, indexing, and compression to support larger sensor fleets.  
* Expanded the hot-store architecture from roughly 20 sensors and 2 months of constrained storage toward a target of 500 sensors with 2 months of historical data.  
* Improved query responsiveness and storage efficiency ahead of planned production scaling to hundreds of deployed sensors.

### **Schema-Driven Firmware Data Model with Protobuf Versioning**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Rolled out the second version of core sensor firmware messaging across the sensor, embedded controller, and Raspberry Pi system.  
* Refactored high-cardinality tables into more focused schemas to improve data delivery and reduce column growth.  
* Added deeper device performance visibility through new firmware-driven data tables and metrics.  
* Used Protobuf versioning to coordinate schema changes across firmware, backend, frontend, Python pipelines, and algorithm repositories.  
* Built schema-driven frontend and backend components to reduce migration friction across distributed repositories.

---

# **EMBEDDED / FIRMWARE / DEVICE TOOLING**

### **Native EEPROM Flashing Application for MacOS and Windows**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Created a native Electron application for MacOS and Windows to flash EEPROMs on Aquatic’s embedded controller.  
* Wrapped an existing Python flashing package into a safer and more usable cross-platform desktop tool.  
* Integrated the flashing workflow with the internal database to reduce manual device-entry errors.  
* Improved manufacturing usability by creating a tool that could be shared safely with non-engineering users and external manufacturers.  
* Reduced friction in device setup by standardizing the EEPROM flashing and metadata registration process.

### **Embedded C++ Sensor Algorithm for On-Device Alkalinity Computation**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Converted a cloud-hosted Python alkalinity algorithm into an embedded C++ implementation that could run directly on the device.  
* Moved computation onto the embedded controller to support offline customer deployments and reduce exposure of proprietary cloud logic.  
* Optimized memory usage by replacing dynamic vectors and mappings with statically typed arrays and constrained data structures.  
* Validated parity between Python and C++ outputs, with slight type-driven output differences remaining within decimal-percentage tolerances.  
* Strengthened deployment security by enabling encrypted on-device execution of core sensor computation logic.

---

# **AI TOOLING / DEVELOPER PRODUCTIVITY**

### **Agentic Debugging Extension for VSCode and MCP**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Built an internal VSCode extension and MCP server that connected debugger context directly into agent workflows.  
* Passed call stack, local variables, breakpoints, launch configuration, and file context into agent sessions for deeper codebase understanding.  
* Enabled agents to run `launch.json`, set breakpoints, and reason through poorly documented legacy code in live debugger sessions.  
* Developed the extension and MCP tooling in TypeScript for use with Cursor, GitHub Copilot, and other VSCode-compatible agent workflows.  
* Improved developer productivity by reducing manual context transfer and accelerating debugging across large internal repositories.

### **AI Tool Adoption and Agentic Development Workflows**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Led AI tool adoption across the software team using Cursor, Claude Code, ChatGPT, GitHub Copilot, MCP, and internal agent tooling.  
* Created best-practice documentation and delivered a lunch-and-learn to teach effective AI-assisted software workflows.  
* Built reusable context folders, rules, hooks, commands, skills, workflows, and agent plans into project repositories.  
* Standardized AI-assisted development practices for debugging, onboarding, code generation, and repetitive engineering workflows.  
* Improved team productivity by reducing repetitive work and creating shared development context across multiple repositories.

---

# **DEVOPS / CI/CD / RELEASE ENGINEERING**

### **Repository Ownership and Cross-Project CI/CD Platform**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Owned the full development lifecycle across data analysis, algorithms Python, algorithms C++, internal web application, data schema, and customer application repositories.  
* Acted as primary developer across architecture, documentation, code review, release management, and CI/CD.  
* Stood up GitHub Actions pipelines with self-hosted runners for build, lint, test, type-check, package, and deployment workflows.  
* Added Makefiles across projects to standardize common development, testing, and deployment commands.  
* Implemented blue-green deployment strategies for application layers to reduce downtime while separating app deployments from infrastructure-level changes.

### **Self-Hosted CI Infrastructure for Hardware-Aware Testing**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Configured self-hosted GitHub Actions runners across a NUC and two tower workstations for internal CI/CD workflows.  
* Built the foundation for comprehensive test execution across software repositories and future hardware-in-the-loop testing.  
* Supported automated builds, test suites, type checks, and deployment workflows across Aquatic’s internal codebase.  
* Prepared infrastructure for tighter integration between firmware, device testing, and application deployment pipelines.  
* Improved internal release discipline by tying repository changes to repeatable validation workflows.

---

# **INFRASTRUCTURE / NETWORKING / INTERNAL SYSTEMS**

### **Tailscale Mesh Network for Internal Access and Remote Operations**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Built Tailscale infrastructure across local servers, AWS instances, developer laptops, and internal devices.  
* Configured subnet routing and DNS resolution to support access to internal applications outside the company network.  
* Enabled remote access to internal applications, file-sharing systems, and operational services without a traditional VPN.  
* Improved incident response by allowing the team to address outages remotely instead of waiting for on-site access.  
* Supported internal routing and mesh networking needs during infrastructure expansion and NSF certification preparation.

### **On-Prem Server Infrastructure for File Sharing, Research, and CI/CD**

**Full Stack Software Engineer, IoT Systems, Aquatic Labs**  
**2026 \- Present**

* Flashed operating systems, configured RAID 1, and stood up four on-prem servers for Aquatic’s internal infrastructure.  
* Built one server for CI/CD pipelines, one for developer jobs and analytics compute, one GPU-enabled research server, and one file-sharing server.  
* Hosted file sharing, GitHub runners, databases, research workloads, and internal development services.  
* Configured RAID-backed storage to improve resilience across local infrastructure systems.  
* Expanded Aquatic’s on-prem compute capacity for development, research, file management, and deployment workflows.