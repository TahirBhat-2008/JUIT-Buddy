import { CourseDetail } from "./types";

/**
 * Keyed by the exact course name used in syllabusData (CampusInfo.tsx).
 * Courses not present here will show a "Details coming soon" placeholder.
 */
export const SYLLABUS_DETAILS: Record<string, CourseDetail> = {

  // Data Structures
  "Data Structures": {
    code: "CS-201",
    title: "Data Structures",
    credits: { L: 3, T: 0, P: 2 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["Programming for Problem Solving"],
    objectives: [
      "Understand fundamental data structures: arrays, stacks, queues, linked lists, trees, and graphs.",
      "Analyse the time and space complexity of algorithms using Big-O notation.",
      "Design and implement efficient solutions using appropriate data structures.",
      "Apply hashing and heap-based techniques for fast data retrieval.",
      "Prepare a strong foundation for competitive programming and advanced CS courses.",
    ],
    units: [
      { number: 1, title: "Introduction & Arrays", hours: 8, topics: [
        { name: "Abstract Data Types (ADT)", subtopics: ["Definition", "ADT vs data structure", "Performance analysis"] },
        { name: "Arrays", subtopics: ["1D & 2D arrays", "Sparse matrices", "Polynomial representation"] },
        { name: "Complexity Analysis", subtopics: ["Big-O, Theta, Omega", "Best / worst / average case"] },
      ]},
      { number: 2, title: "Stacks & Queues", hours: 8, topics: [
        { name: "Stack", subtopics: ["Array & linked list implementation", "Expression evaluation", "Infix to Postfix conversion"] },
        { name: "Queue", subtopics: ["Linear, circular, deque", "Priority queue"] },
        { name: "Applications", subtopics: ["Function call stack", "BFS using queue"] },
      ]},
      { number: 3, title: "Linked Lists", hours: 10, topics: [
        { name: "Singly Linked List", subtopics: ["Insertion, deletion, traversal", "Reversal algorithms"] },
        { name: "Doubly Linked List", subtopics: ["Operations", "XOR linked list (advanced)"] },
        { name: "Circular Linked List", subtopics: ["Josephus problem"] },
      ]},
      { number: 4, title: "Trees", hours: 12, topics: [
        { name: "Binary Tree", subtopics: ["Representations", "Traversals: Inorder, Preorder, Postorder"] },
        { name: "Binary Search Tree", subtopics: ["Insert, delete, search", "Successor & predecessor"] },
        { name: "AVL Tree", subtopics: ["Rotations: LL, RR, LR, RL", "Insertion & deletion"] },
        { name: "Heap", subtopics: ["Max heap, min heap", "Heap sort"] },
        { name: "B-Tree & B+ Tree", subtopics: ["Concepts and database use cases"] },
      ]},
      { number: 5, title: "Graphs & Hashing", hours: 10, topics: [
        { name: "Graph Representation", subtopics: ["Adjacency matrix, adjacency list"] },
        { name: "Graph Traversal", subtopics: ["BFS", "DFS"] },
        { name: "Shortest Path", subtopics: ["Dijkstra's algorithm", "Bellman-Ford"] },
        { name: "Hashing", subtopics: ["Hash functions", "Collision: chaining, open addressing"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Choose and implement an appropriate data structure for a given problem." },
      { id: "CO2", description: "Analyse time and space complexity using asymptotic notation." },
      { id: "CO3", description: "Implement tree-based structures including BST, AVL, and heaps." },
      { id: "CO4", description: "Apply graph algorithms (BFS, DFS, Dijkstra, Kruskal) to network problems." },
      { id: "CO5", description: "Use hashing for efficient data retrieval in real-world scenarios." },
    ],
    books: {
      textbooks: [
        { author: "Ellis Horowitz, Sartaj Sahni", title: "Fundamentals of Data Structures in C", edition: "2nd", publisher: "Universities Press" },
        { author: "Mark Allen Weiss", title: "Data Structures and Algorithm Analysis in C++", edition: "4th", publisher: "Pearson" },
      ],
      references: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "3rd", publisher: "MIT Press" },
        { author: "Robert Sedgewick", title: "Algorithms in C++", edition: "3rd", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "Visualgo — Interactive DS Visualizations", url: "https://visualgo.net" },
        { title: "NPTEL: Data Structures and Algorithms", url: "https://nptel.ac.in" },
        { title: "GeeksforGeeks — Data Structures", url: "https://geeksforgeeks.org/data-structures" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Database Management Systems": {
    code: "CS-202",
    title: "Database Management Systems",
    credits: { L: 3, T: 0, P: 2 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["Programming for Problem Solving"],
    objectives: [
      "Understand the architecture and purpose of a database management system.",
      "Design relational schemas using ER diagrams and normalization techniques.",
      "Write complex SQL queries including joins, subqueries, and aggregate functions.",
      "Understand transaction management, concurrency control, and recovery techniques.",
      "Get an introduction to NoSQL databases and emerging storage paradigms.",
    ],
    units: [
      { number: 1, title: "Introduction to DBMS", hours: 6, topics: [
        { name: "Database Concepts", subtopics: ["File system vs DBMS", "Advantages of DBMS", "Database users and DBA"] },
        { name: "Data Models", subtopics: ["Hierarchical, Network, Relational, Object-Oriented"] },
        { name: "Database Architecture", subtopics: ["3-schema architecture", "Data independence"] },
      ]},
      { number: 2, title: "ER Model & Relational Model", hours: 10, topics: [
        { name: "Entity-Relationship Model", subtopics: ["Entities, attributes, relationships", "Cardinality constraints", "Weak entities", "ER-to-relational mapping"] },
        { name: "Relational Model", subtopics: ["Relational algebra: select, project, join", "Tuple relational calculus", "Keys: primary, foreign, candidate"] },
      ]},
      { number: 3, title: "SQL", hours: 10, topics: [
        { name: "DDL & DML", subtopics: ["CREATE, ALTER, DROP", "INSERT, UPDATE, DELETE, SELECT"] },
        { name: "Advanced SQL", subtopics: ["Joins (inner, outer, self)", "Subqueries", "Aggregate functions & GROUP BY", "Views & indexes"] },
        { name: "PL/SQL Basics", subtopics: ["Stored procedures", "Triggers"] },
      ]},
      { number: 4, title: "Normalization", hours: 8, topics: [
        { name: "Functional Dependencies", subtopics: ["Armstrong's axioms", "Closure of attributes"] },
        { name: "Normal Forms", subtopics: ["1NF, 2NF, 3NF", "Boyce-Codd Normal Form (BCNF)", "4NF and 5NF overview"] },
        { name: "Decomposition", subtopics: ["Lossless join", "Dependency preservation"] },
      ]},
      { number: 5, title: "Transactions, Concurrency & NoSQL", hours: 8, topics: [
        { name: "Transactions", subtopics: ["ACID properties", "Transaction states"] },
        { name: "Concurrency Control", subtopics: ["Lock-based protocols", "Two-phase locking (2PL)", "Deadlock handling"] },
        { name: "Recovery", subtopics: ["Log-based recovery", "Checkpointing"] },
        { name: "NoSQL Overview", subtopics: ["Document, key-value, columnar, graph DBs", "CAP theorem"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design a relational database schema using ER modelling." },
      { id: "CO2", description: "Write efficient SQL queries using joins, subqueries, and aggregate functions." },
      { id: "CO3", description: "Apply normalization up to BCNF to eliminate redundancy." },
      { id: "CO4", description: "Explain ACID properties and concurrency control mechanisms." },
      { id: "CO5", description: "Compare relational and NoSQL databases for a given use case." },
    ],
    books: {
      textbooks: [
        { author: "Abraham Silberschatz, Henry Korth, S. Sudarshan", title: "Database System Concepts", edition: "7th", publisher: "McGraw-Hill" },
        { author: "Ramez Elmasri, Shamkant Navathe", title: "Fundamentals of Database Systems", edition: "7th", publisher: "Pearson" },
      ],
      references: [
        { author: "C.J. Date", title: "An Introduction to Database Systems", edition: "8th", publisher: "Pearson" },
        { author: "Raghu Ramakrishnan, Johannes Gehrke", title: "Database Management Systems", edition: "3rd", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "NPTEL: Database Management Systems", url: "https://nptel.ac.in" },
        { title: "SQLZoo — Interactive SQL Learning", url: "https://sqlzoo.net" },
        { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Design and Analysis of Algorithms": {
    code: "CS-301",
    title: "Design and Analysis of Algorithms",
    credits: { L: 3, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Data Structures", "Mathematics-I"],
    objectives: [
      "Analyse time and space complexity of algorithms using asymptotic notations.",
      "Design algorithms using divide-and-conquer, greedy, and dynamic programming paradigms.",
      "Understand NP-completeness and classify computational problems.",
      "Implement and compare sorting, searching, and graph algorithms.",
      "Apply algorithm design techniques to real-world engineering problems.",
    ],
    units: [
      { number: 1, title: "Algorithmic Analysis", hours: 8, topics: [
        { name: "Complexity Notations", subtopics: ["Big-O, Big-Omega, Big-Theta", "Recurrence relations", "Master theorem"] },
        { name: "Sorting Algorithms", subtopics: ["Merge sort, Quick sort", "Heap sort, Counting sort, Radix sort", "Lower bound for comparison sorting"] },
      ]},
      { number: 2, title: "Divide and Conquer", hours: 8, topics: [
        { name: "Paradigm Overview", subtopics: ["Subproblem decomposition", "Strassen's matrix multiplication"] },
        { name: "Classic Problems", subtopics: ["Binary search", "Maximum subarray (Kadane's)", "Closest pair of points"] },
      ]},
      { number: 3, title: "Greedy Algorithms", hours: 8, topics: [
        { name: "Greedy Strategy", subtopics: ["Activity selection problem", "Fractional knapsack"] },
        { name: "Graph Applications", subtopics: ["Prim's & Kruskal's MST", "Dijkstra's shortest path", "Huffman coding"] },
      ]},
      { number: 4, title: "Dynamic Programming", hours: 12, topics: [
        { name: "DP Fundamentals", subtopics: ["Memoization vs tabulation", "Optimal substructure & overlapping subproblems"] },
        { name: "Classic DP Problems", subtopics: ["0/1 Knapsack", "Longest Common Subsequence", "Matrix Chain Multiplication", "Edit Distance", "Coin Change"] },
      ]},
      { number: 5, title: "Backtracking & NP-Completeness", hours: 10, topics: [
        { name: "Backtracking", subtopics: ["N-Queens", "Sudoku solver", "Hamiltonian cycle"] },
        { name: "Branch & Bound", subtopics: ["Travelling Salesman Problem"] },
        { name: "NP-Completeness", subtopics: ["P vs NP", "NP-hard & NP-complete classes", "Reduction examples: SAT, Vertex Cover"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply Big-O analysis and solve recurrences using the Master Theorem." },
      { id: "CO2", description: "Design divide-and-conquer algorithms and prove correctness." },
      { id: "CO3", description: "Apply greedy techniques to graph and optimisation problems." },
      { id: "CO4", description: "Solve complex optimisation problems using dynamic programming." },
      { id: "CO5", description: "Classify problems as P, NP, NP-hard, or NP-complete." },
    ],
    books: {
      textbooks: [
        { author: "Thomas H. Cormen, Charles Leiserson, Ronald Rivest, Clifford Stein", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
        { author: "S. Dasgupta, C. Papadimitriou, U. Vazirani", title: "Algorithms", edition: "1st", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Jon Kleinberg, Eva Tardos", title: "Algorithm Design", edition: "1st", publisher: "Pearson" },
      ],
      online: [
        { title: "CP-Algorithms (e-maxx)", url: "https://cp-algorithms.com" },
        { title: "NPTEL: Design and Analysis of Algorithms", url: "https://nptel.ac.in" },
        { title: "Codeforces — Competitive Programming", url: "https://codeforces.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Artificial Intelligence and Machine Learning": {
    code: "CS-302",
    title: "Artificial Intelligence and Machine Learning",
    credits: { L: 3, T: 0, P: 2 },
    semester: 4,
    branch: "CSE",
    prerequisites: ["Mathematics-I", "Mathematics-II", "Programming for Problem Solving"],
    objectives: [
      "Understand the foundations of AI: search strategies, knowledge representation, and reasoning.",
      "Learn supervised and unsupervised machine learning algorithms from first principles.",
      "Apply regression, classification, and clustering to real datasets.",
      "Understand neural networks and the basics of deep learning.",
      "Evaluate ML models using appropriate metrics and avoid overfitting.",
    ],
    units: [
      { number: 1, title: "Introduction to AI & Search", hours: 8, topics: [
        { name: "AI Overview", subtopics: ["History and applications", "Intelligent agents", "Environment types"] },
        { name: "Search Strategies", subtopics: ["Uninformed: BFS, DFS, IDDFS", "Informed: A*, Greedy Best-First", "Adversarial: Minimax, Alpha-Beta pruning"] },
      ]},
      { number: 2, title: "Knowledge Representation", hours: 6, topics: [
        { name: "Propositional Logic", subtopics: ["Syntax, semantics, resolution"] },
        { name: "First-Order Logic", subtopics: ["Quantifiers, unification, chaining"] },
        { name: "Bayesian Networks", subtopics: ["Conditional probability", "Naive Bayes classifier"] },
      ]},
      { number: 3, title: "Supervised Learning", hours: 10, topics: [
        { name: "Regression", subtopics: ["Linear regression", "Polynomial regression", "Gradient descent"] },
        { name: "Classification", subtopics: ["Logistic regression", "Decision trees & Random Forest", "SVM", "k-Nearest Neighbours"] },
        { name: "Model Evaluation", subtopics: ["Cross-validation", "Precision, recall, F1, ROC-AUC", "Bias-variance tradeoff"] },
      ]},
      { number: 4, title: "Unsupervised Learning", hours: 8, topics: [
        { name: "Clustering", subtopics: ["k-Means", "Hierarchical clustering", "DBSCAN"] },
        { name: "Dimensionality Reduction", subtopics: ["PCA", "t-SNE overview"] },
        { name: "Association Rules", subtopics: ["Apriori algorithm", "Support, confidence, lift"] },
      ]},
      { number: 5, title: "Neural Networks & Deep Learning", hours: 10, topics: [
        { name: "Perceptron & MLP", subtopics: ["Activation functions", "Backpropagation"] },
        { name: "CNNs & RNNs", subtopics: ["Convolution layers", "Pooling", "LSTM basics"] },
        { name: "Deep Learning Frameworks", subtopics: ["TensorFlow/Keras basics", "PyTorch overview"] },
        { name: "Applications", subtopics: ["Image classification", "NLP basics", "Recommender systems"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply search algorithms (A*, Minimax) to AI problem solving." },
      { id: "CO2", description: "Implement and evaluate supervised ML models for classification and regression." },
      { id: "CO3", description: "Apply clustering and dimensionality reduction to unlabelled data." },
      { id: "CO4", description: "Design and train a basic neural network using a deep learning framework." },
      { id: "CO5", description: "Select appropriate ML algorithms and evaluation metrics for a given problem." },
    ],
    books: {
      textbooks: [
        { author: "Stuart Russell, Peter Norvig", title: "Artificial Intelligence: A Modern Approach", edition: "4th", publisher: "Pearson" },
        { author: "Aurelien Geron", title: "Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow", edition: "3rd", publisher: "O'Reilly" },
      ],
      references: [
        { author: "Christopher M. Bishop", title: "Pattern Recognition and Machine Learning", edition: "1st", publisher: "Springer" },
        { author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", title: "Deep Learning", publisher: "MIT Press" },
      ],
      online: [
        { title: "fast.ai — Practical Deep Learning", url: "https://fast.ai" },
        { title: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
        { title: "Kaggle Learn", url: "https://kaggle.com/learn" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Operating Systems": {
    code: "CS-401",
    title: "Operating Systems",
    credits: { L: 3, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Data Structures", "Digital Systems and Computer Organisation"],
    objectives: [
      "Understand the role of an OS as a resource manager and hardware-software interface.",
      "Analyse CPU scheduling algorithms and their performance trade-offs.",
      "Apply process synchronisation and deadlock prevention/avoidance techniques.",
      "Implement memory management strategies: paging, segmentation, and virtual memory.",
      "Understand file systems, I/O management, and OS security basics.",
    ],
    units: [
      { number: 1, title: "Introduction & Processes", hours: 8, topics: [
        { name: "OS Overview", subtopics: ["Goals and functions", "Types: Batch, Time-sharing, Real-time, Distributed"] },
        { name: "Process Management", subtopics: ["Process states & PCB", "Context switching", "Threads vs processes", "IPC: pipes, message queues, shared memory"] },
      ]},
      { number: 2, title: "CPU Scheduling", hours: 8, topics: [
        { name: "Scheduling Criteria", subtopics: ["CPU utilisation, throughput, turnaround, waiting, response time"] },
        { name: "Algorithms", subtopics: ["FCFS, SJF (preemptive & non-preemptive)", "Round Robin", "Priority Scheduling", "Multilevel Queue & Feedback Queue"] },
        { name: "Evaluation", subtopics: ["Gantt charts", "Average waiting time calculations"] },
      ]},
      { number: 3, title: "Synchronisation & Deadlock", hours: 10, topics: [
        { name: "Synchronisation", subtopics: ["Critical section problem", "Peterson's solution", "Semaphores", "Monitors", "Classic problems: Producer-Consumer, Dining Philosophers"] },
        { name: "Deadlock", subtopics: ["Necessary conditions", "Resource Allocation Graph", "Prevention & avoidance (Banker's algorithm)", "Detection & recovery"] },
      ]},
      { number: 4, title: "Memory Management", hours: 10, topics: [
        { name: "Contiguous Allocation", subtopics: ["Fixed & variable partitioning", "First-fit, Best-fit, Worst-fit"] },
        { name: "Paging", subtopics: ["Page table, TLB", "Two-level page tables", "Effective access time"] },
        { name: "Virtual Memory", subtopics: ["Demand paging", "Page replacement: FIFO, LRU, Optimal", "Thrashing & working set model"] },
      ]},
      { number: 5, title: "File Systems & I/O", hours: 8, topics: [
        { name: "File System", subtopics: ["File attributes, operations", "Directory structures", "FAT, inode-based file systems"] },
        { name: "I/O Management", subtopics: ["Disk scheduling: FCFS, SSTF, SCAN, C-SCAN", "RAID levels"] },
        { name: "OS Security Basics", subtopics: ["Authentication", "Access control lists", "Common threats"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Explain process management, scheduling, and inter-process communication." },
      { id: "CO2", description: "Compare CPU scheduling algorithms and calculate performance metrics." },
      { id: "CO3", description: "Apply semaphores and monitors to solve classic synchronisation problems." },
      { id: "CO4", description: "Implement page replacement algorithms and understand virtual memory." },
      { id: "CO5", description: "Describe file system structures and disk scheduling strategies." },
    ],
    books: {
      textbooks: [
        { author: "Abraham Silberschatz, Peter Galvin, Greg Gagne", title: "Operating System Concepts (Dinosaur Book)", edition: "10th", publisher: "Wiley" },
        { author: "Andrew S. Tanenbaum, Herbert Bos", title: "Modern Operating Systems", edition: "4th", publisher: "Pearson" },
      ],
      references: [
        { author: "William Stallings", title: "Operating Systems: Internals and Design Principles", edition: "9th", publisher: "Pearson" },
        { author: "Robert Love", title: "Linux Kernel Development", edition: "3rd", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "OSDev Wiki", url: "https://wiki.osdev.org" },
        { title: "NPTEL: Operating Systems", url: "https://nptel.ac.in" },
        { title: "MIT 6.828: OS Engineering", url: "https://pdos.csail.mit.edu/6.828" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Computer Networks": {
    code: "CS-402",
    title: "Computer Networks",
    credits: { L: 3, T: 1, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Digital Systems and Computer Organisation", "Operating Systems"],
    objectives: [
      "Understand the layered architecture of computer networks (OSI and TCP/IP models).",
      "Analyse protocols at each layer: physical, data link, network, transport, and application.",
      "Design and evaluate routing algorithms for packet-switched networks.",
      "Understand TCP, UDP, and reliable data transfer mechanisms.",
      "Learn application-layer protocols and basics of network security.",
    ],
    units: [
      { number: 1, title: "Introduction & Physical Layer", hours: 8, topics: [
        { name: "Network Fundamentals", subtopics: ["Types: LAN, MAN, WAN", "Topologies", "OSI vs TCP/IP model", "Transmission modes"] },
        { name: "Physical Layer", subtopics: ["Guided media: coaxial, fibre, twisted pair", "Unguided: radio, microwave", "Multiplexing: TDM, FDM, WDM", "Switching: circuit, packet, message"] },
      ]},
      { number: 2, title: "Data Link Layer", hours: 8, topics: [
        { name: "Error Control", subtopics: ["CRC", "Hamming code", "Stop-and-Wait, Go-Back-N, Selective Repeat ARQ"] },
        { name: "MAC Protocols", subtopics: ["ALOHA (pure & slotted)", "CSMA/CD (Ethernet)", "CSMA/CA (Wi-Fi 802.11)"] },
        { name: "LAN Protocols", subtopics: ["Ethernet frames", "Switches & bridges", "VLANs"] },
      ]},
      { number: 3, title: "Network Layer", hours: 10, topics: [
        { name: "IPv4 & IPv6", subtopics: ["IP addressing & subnetting", "CIDR & VLSM", "NAT", "IPv6 features"] },
        { name: "Routing", subtopics: ["Distance vector: RIP (Bellman-Ford)", "Link state: OSPF (Dijkstra)", "Path vector: BGP basics"] },
        { name: "Support Protocols", subtopics: ["ICMP", "ARP", "DHCP"] },
      ]},
      { number: 4, title: "Transport Layer", hours: 8, topics: [
        { name: "UDP", subtopics: ["Connectionless, unreliable", "Use cases: DNS, video streaming"] },
        { name: "TCP", subtopics: ["3-way handshake", "Reliable transfer: sequence numbers, ACKs", "Flow control: sliding window", "Congestion control: Slow Start, AIMD"] },
        { name: "Socket Programming", subtopics: ["TCP sockets", "UDP sockets"] },
      ]},
      { number: 5, title: "Application Layer & Security", hours: 8, topics: [
        { name: "Application Protocols", subtopics: ["HTTP/HTTPS & REST", "DNS: resolution, record types", "SMTP, POP3, IMAP", "FTP & SFTP"] },
        { name: "Network Security", subtopics: ["Symmetric & asymmetric encryption", "TLS/SSL handshake", "Firewalls & IDS/IPS", "VPNs"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Explain the OSI and TCP/IP models and the role of each layer." },
      { id: "CO2", description: "Design and subnet IP address spaces using CIDR notation." },
      { id: "CO3", description: "Compare routing algorithms (RIP, OSPF, BGP) and trace packet routing." },
      { id: "CO4", description: "Explain TCP's reliable data transfer, flow control, and congestion control." },
      { id: "CO5", description: "Describe application-layer protocols and network security concepts." },
    ],
    books: {
      textbooks: [
        { author: "James F. Kurose, Keith W. Ross", title: "Computer Networking: A Top-Down Approach", edition: "8th", publisher: "Pearson" },
        { author: "Andrew S. Tanenbaum, David Wetherall", title: "Computer Networks", edition: "5th", publisher: "Pearson" },
      ],
      references: [
        { author: "Behrouz A. Forouzan", title: "Data Communications and Networking", edition: "5th", publisher: "McGraw-Hill" },
        { author: "W. Richard Stevens", title: "TCP/IP Illustrated, Volume 1", edition: "2nd", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "Wireshark — Packet Analyser", url: "https://wireshark.org" },
        { title: "Cisco Packet Tracer (Free for Students)", url: "https://netacad.com" },
        { title: "NPTEL: Computer Networks", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },
  // ─── Semester 1 ──────────────────────────────────────────────────────────

  "Mathematics-I": {
    code: "MA-101",
    title: "Engineering Mathematics-I",
    credits: { L: 3, T: 1, P: 0 },
    semester: 1,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Understand sequences, series, and their convergence properties.",
      "Apply differential calculus to engineering problems involving maxima, minima, and curve tracing.",
      "Solve problems using integral calculus including multiple integrals.",
      "Understand matrices, determinants, and their applications to linear systems.",
      "Apply vector calculus concepts: gradient, divergence, and curl.",
    ],
    units: [
      { number: 1, title: "Sequences & Series", hours: 10, topics: [
        { name: "Sequences", subtopics: ["Definition, limits", "Monotone sequences", "Bounded sequences"] },
        { name: "Series", subtopics: ["Convergence & divergence", "Ratio test", "Root test", "Alternating series"] },
        { name: "Power Series", subtopics: ["Radius of convergence", "Taylor & Maclaurin series"] },
      ]},
      { number: 2, title: "Differential Calculus", hours: 10, topics: [
        { name: "Limits & Continuity", subtopics: ["L'Hopital's rule"] },
        { name: "Differentiation", subtopics: ["Rules of differentiation", "Implicit differentiation", "Higher-order derivatives"] },
        { name: "Applications", subtopics: ["Maxima & minima", "Rolle's theorem & MVT", "Taylor's theorem"] },
      ]},
      { number: 3, title: "Integral Calculus", hours: 10, topics: [
        { name: "Integration Techniques", subtopics: ["Integration by parts", "Substitution", "Partial fractions"] },
        { name: "Applications", subtopics: ["Area under curves", "Arc length", "Volume of revolution"] },
        { name: "Improper Integrals", subtopics: ["Type I & II", "Comparison test"] },
      ]},
      { number: 4, title: "Multiple Integrals", hours: 8, topics: [
        { name: "Double Integrals", subtopics: ["Cartesian form", "Change of order of integration"] },
        { name: "Triple Integrals", subtopics: ["Volume computation"] },
        { name: "Change of Variables", subtopics: ["Polar, cylindrical, spherical coordinates"] },
      ]},
      { number: 5, title: "Matrices & Linear Algebra", hours: 10, topics: [
        { name: "Matrix Operations", subtopics: ["Types of matrices", "Determinants", "Rank"] },
        { name: "Linear Systems", subtopics: ["Gauss elimination", "Consistency", "Homogeneous systems"] },
        { name: "Eigenvalues & Eigenvectors", subtopics: ["Characteristic equation", "Diagonalization", "Cayley-Hamilton theorem"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Test convergence of series and find power series representations." },
      { id: "CO2", description: "Apply differential calculus to optimisation and curve analysis." },
      { id: "CO3", description: "Evaluate definite, indefinite, and improper integrals." },
      { id: "CO4", description: "Compute double and triple integrals for geometry problems." },
      { id: "CO5", description: "Solve linear systems and compute eigenvalues using matrix methods." },
    ],
    books: {
      textbooks: [
        { author: "B.S. Grewal", title: "Higher Engineering Mathematics", edition: "44th", publisher: "Khanna Publishers" },
        { author: "Erwin Kreyszig", title: "Advanced Engineering Mathematics", edition: "10th", publisher: "Wiley" },
      ],
      references: [
        { author: "G.B. Thomas, R.L. Finney", title: "Calculus and Analytic Geometry", edition: "9th", publisher: "Pearson" },
        { author: "R.K. Jain, S.R.K. Iyengar", title: "Advanced Engineering Mathematics", edition: "3rd", publisher: "Narosa" },
      ],
      online: [
        { title: "Khan Academy - Calculus", url: "https://khanacademy.org/math/calculus-1" },
        { title: "NPTEL: Mathematics-I", url: "https://nptel.ac.in" },
        { title: "MIT OCW: Single Variable Calculus", url: "https://ocw.mit.edu/courses/18-01sc" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "BSC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of Mathematics" },
  },
  "Physics-I": {
    code: "PH-101",
    title: "Engineering Physics-I",
    credits: { L: 3, T: 1, P: 0 },
    semester: 1,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Understand wave mechanics and its applications in engineering systems.",
      "Apply concepts of optics including interference, diffraction, and polarisation.",
      "Understand quantum mechanics fundamentals: duality, uncertainty principle, and Schrodinger equation.",
      "Study electromagnetic theory and Maxwell's equations.",
      "Understand lasers, optical fibres, and their engineering applications.",
    ],
    units: [
      { number: 1, title: "Oscillations & Waves", hours: 8, topics: [
        { name: "Simple Harmonic Motion", subtopics: ["Equations of SHM", "Energy in SHM", "Damped oscillations"] },
        { name: "Wave Motion", subtopics: ["Wave equation", "Superposition principle"] },
        { name: "Acoustic Waves", subtopics: ["Ultrasound", "NDT applications"] },
      ]},
      { number: 2, title: "Optics", hours: 10, topics: [
        { name: "Interference", subtopics: ["Young's double slit", "Newton's rings", "Thin films"] },
        { name: "Diffraction", subtopics: ["Fraunhofer diffraction", "Single slit", "Diffraction grating"] },
        { name: "Polarisation", subtopics: ["Types of polarisation", "Brewster's law", "Malus's law"] },
      ]},
      { number: 3, title: "Quantum Mechanics", hours: 10, topics: [
        { name: "Wave-Particle Duality", subtopics: ["Photoelectric effect", "Compton effect", "de Broglie hypothesis"] },
        { name: "Uncertainty Principle", subtopics: ["Heisenberg's uncertainty principle"] },
        { name: "Schrodinger Equation", subtopics: ["Time-independent form", "Particle in a box"] },
      ]},
      { number: 4, title: "Lasers & Fibre Optics", hours: 8, topics: [
        { name: "Lasers", subtopics: ["Stimulated emission", "Population inversion", "He-Ne & Ruby laser", "Applications"] },
        { name: "Optical Fibres", subtopics: ["Total internal reflection", "Numerical aperture", "Types", "Attenuation"] },
      ]},
      { number: 5, title: "Electromagnetic Theory", hours: 8, topics: [
        { name: "Electrostatics", subtopics: ["Gauss's law", "Electric potential"] },
        { name: "Magnetostatics", subtopics: ["Biot-Savart law", "Ampere's law"] },
        { name: "Maxwell's Equations", subtopics: ["Faraday's law", "Displacement current", "EM waves"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Analyse oscillatory and wave systems using mathematical models." },
      { id: "CO2", description: "Apply principles of interference and diffraction to optical systems." },
      { id: "CO3", description: "Explain wave-particle duality and solve quantum mechanics problems." },
      { id: "CO4", description: "Describe working principles of lasers and optical fibres." },
      { id: "CO5", description: "Apply Maxwell's equations to electromagnetic wave propagation." },
    ],
    books: {
      textbooks: [
        { author: "H.K. Malik, A.K. Singh", title: "Engineering Physics", edition: "2nd", publisher: "McGraw-Hill" },
        { author: "M.N. Avadhanulu, P.G. Kshirsagar", title: "A Textbook of Engineering Physics", edition: "10th", publisher: "S. Chand" },
      ],
      references: [
        { author: "D. Halliday, R. Resnick, J. Walker", title: "Fundamentals of Physics", edition: "10th", publisher: "Wiley" },
        { author: "Arthur Beiser", title: "Concepts of Modern Physics", edition: "6th", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "MIT OCW: Physics I", url: "https://ocw.mit.edu/courses/8-01" },
        { title: "NPTEL: Engineering Physics", url: "https://nptel.ac.in" },
        { title: "Khan Academy: Physics", url: "https://khanacademy.org/science/physics" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "BSC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of Physics" },
  },

  "Software Development Fundamentals-I": {
    code: "CS-101",
    title: "Software Development Fundamentals-I (C Programming)",
    credits: { L: 3, T: 0, P: 2 },
    semester: 1,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Understand the fundamentals of programming using C language.",
      "Learn to write structured programs using control flow, functions, and arrays.",
      "Understand pointers and dynamic memory allocation in C.",
      "Apply string manipulation and file I/O operations.",
      "Develop problem-solving and algorithmic thinking skills.",
    ],
    units: [
      { number: 1, title: "Introduction to Programming & C Basics", hours: 8, topics: [
        { name: "Problem Solving", subtopics: ["Algorithms & flowcharts", "Pseudocode"] },
        { name: "C Fundamentals", subtopics: ["Data types, variables", "Operators & expressions", "printf, scanf"] },
        { name: "Control Flow", subtopics: ["if-else, switch-case", "for, while, do-while loops", "break, continue"] },
      ]},
      { number: 2, title: "Functions & Arrays", hours: 8, topics: [
        { name: "Functions", subtopics: ["Declaration, definition, call", "Call by value", "Recursion: factorial, Fibonacci, ToH"] },
        { name: "Arrays", subtopics: ["1D & 2D arrays", "Passing arrays to functions"] },
        { name: "Searching & Sorting", subtopics: ["Linear & binary search", "Bubble, selection, insertion sort"] },
      ]},
      { number: 3, title: "Pointers", hours: 8, topics: [
        { name: "Pointer Basics", subtopics: ["Address & dereference operators", "Pointer arithmetic"] },
        { name: "Pointers & Arrays", subtopics: ["Array using pointers", "String operations"] },
        { name: "Dynamic Memory", subtopics: ["malloc, calloc, realloc, free"] },
      ]},
      { number: 4, title: "Strings & Structures", hours: 8, topics: [
        { name: "Strings", subtopics: ["Declaration", "strlen, strcpy, strcat, strcmp"] },
        { name: "Structures", subtopics: ["struct definition", "Array of structures", "typedef"] },
        { name: "Unions & Enumerations", subtopics: ["union vs struct", "enum usage"] },
      ]},
      { number: 5, title: "File I/O & Preprocessor", hours: 6, topics: [
        { name: "File Operations", subtopics: ["fopen, fclose, fread, fwrite", "fprintf, fscanf", "Text vs binary files"] },
        { name: "Preprocessor", subtopics: ["#define, #include", "Macros", "Conditional compilation"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Write structured C programs using control flow and functions." },
      { id: "CO2", description: "Implement common searching and sorting algorithms." },
      { id: "CO3", description: "Use pointers and dynamic memory allocation." },
      { id: "CO4", description: "Manipulate strings and define data types using structures." },
      { id: "CO5", description: "Perform file I/O operations and use preprocessor directives." },
    ],
    books: {
      textbooks: [
        { author: "Brian W. Kernighan, Dennis M. Ritchie", title: "The C Programming Language", edition: "2nd", publisher: "Prentice Hall" },
        { author: "E. Balagurusamy", title: "Programming in ANSI C", edition: "8th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Yashavant Kanetkar", title: "Let Us C", edition: "17th", publisher: "BPB Publications" },
      ],
      online: [
        { title: "CS50x - Harvard Intro CS", url: "https://cs50.harvard.edu/x" },
        { title: "GeeksforGeeks: C Programming", url: "https://geeksforgeeks.org/c-programming-language" },
        { title: "NPTEL: Programming in C", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "ESC", difficulty: "Easy", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Basic Electronics": {
    code: "EC-101",
    title: "Basic Electronics Engineering",
    credits: { L: 3, T: 1, P: 0 },
    semester: 1,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Understand basic circuit elements: resistors, capacitors, and inductors.",
      "Apply Kirchhoff's laws and network theorems to analyse DC/AC circuits.",
      "Study semiconductor devices: diodes and transistors.",
      "Understand rectifier circuits, amplifiers, and operational amplifiers.",
      "Get familiar with digital logic gates and number systems.",
    ],
    units: [
      { number: 1, title: "Circuit Fundamentals", hours: 8, topics: [
        { name: "Basic Concepts", subtopics: ["Charge, current, voltage, power", "Ohm's law", "KCL & KVL"] },
        { name: "Circuit Elements", subtopics: ["Resistors: series & parallel", "Capacitors & inductors"] },
        { name: "Network Theorems", subtopics: ["Thevenin's theorem", "Norton's theorem", "Superposition", "Max power transfer"] },
      ]},
      { number: 2, title: "AC Circuits", hours: 8, topics: [
        { name: "Sinusoidal Signals", subtopics: ["Amplitude, frequency, phase", "RMS & peak values"] },
        { name: "Impedance", subtopics: ["Reactance", "Phasors", "Power factor"] },
        { name: "Resonance", subtopics: ["Series RLC resonance", "Parallel resonance", "Q-factor"] },
      ]},
      { number: 3, title: "Semiconductor Devices", hours: 10, topics: [
        { name: "PN Junction Diode", subtopics: ["Forward & reverse bias", "I-V characteristics", "Zener diode"] },
        { name: "Rectifiers", subtopics: ["Half-wave, full-wave", "Bridge rectifier", "Filter circuits"] },
        { name: "BJT", subtopics: ["NPN & PNP", "CE, CB, CC configurations", "Load line & Q-point"] },
        { name: "MOSFET Basics", subtopics: ["Enhancement & depletion", "Transfer characteristics"] },
      ]},
      { number: 4, title: "Amplifiers & Op-Amps", hours: 8, topics: [
        { name: "Amplifiers", subtopics: ["CE amplifier", "Gain, bandwidth"] },
        { name: "Operational Amplifier", subtopics: ["Ideal op-amp", "Inverting & non-inverting", "Summing amplifier", "Comparator"] },
        { name: "Feedback & Oscillators", subtopics: ["Negative feedback", "RC & LC oscillators"] },
      ]},
      { number: 5, title: "Digital Electronics Basics", hours: 8, topics: [
        { name: "Number Systems", subtopics: ["Binary, octal, hexadecimal", "Conversions", "BCD, Gray code"] },
        { name: "Logic Gates", subtopics: ["AND, OR, NOT, NAND, NOR, XOR", "Boolean algebra", "De Morgan's theorems"] },
        { name: "Combinational Circuits", subtopics: ["Half adder, full adder", "Multiplexer, decoder"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Analyse DC and AC circuits using KVL, KCL, and network theorems." },
      { id: "CO2", description: "Explain the operation of PN junction diodes and rectifier circuits." },
      { id: "CO3", description: "Analyse BJT amplifier circuits and determine gain." },
      { id: "CO4", description: "Design basic op-amp circuits for signal processing." },
      { id: "CO5", description: "Implement combinational logic using Boolean algebra and logic gates." },
    ],
    books: {
      textbooks: [
        { author: "Boylestad & Nashelsky", title: "Electronic Devices and Circuit Theory", edition: "12th", publisher: "Pearson" },
        { author: "David A. Bell", title: "Electronic Devices and Circuits", edition: "5th", publisher: "Oxford University Press" },
      ],
      references: [
        { author: "Sedra & Smith", title: "Microelectronic Circuits", edition: "7th", publisher: "Oxford University Press" },
      ],
      online: [
        { title: "All About Circuits", url: "https://allaboutcircuits.com" },
        { title: "NPTEL: Basic Electronics", url: "https://nptel.ac.in" },
        { title: "CircuitLab - Simulator", url: "https://circuitlab.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of ECE" },
  },

  // ─── Semester 2 ──────────────────────────────────────────────────────────

  "Mathematics-II": {
    code: "MA-102",
    title: "Engineering Mathematics-II",
    credits: { L: 3, T: 1, P: 0 },
    semester: 2,
    branch: "All B.Tech",
    prerequisites: ["Mathematics-I"],
    objectives: [
      "Solve ordinary differential equations (ODEs) and apply them to engineering problems.",
      "Apply Laplace transforms to solve linear ODEs with initial conditions.",
      "Expand functions in Fourier series and solve basic PDEs.",
      "Apply probability distributions and statistical methods to data analysis.",
      "Use numerical methods for root-finding, interpolation, and integration.",
    ],
    units: [
      { number: 1, title: "Ordinary Differential Equations", hours: 10, topics: [
        { name: "First-Order ODEs", subtopics: ["Separable equations", "Linear equations & integrating factor", "Exact equations", "Homogeneous equations"] },
        { name: "Higher-Order ODEs", subtopics: ["Complementary function & particular integral", "Variation of parameters", "Euler-Cauchy equation"] },
        { name: "Applications", subtopics: ["Electrical circuits", "Population growth", "Mechanical vibrations"] },
      ]},
      { number: 2, title: "Laplace Transforms", hours: 10, topics: [
        { name: "Laplace Transform", subtopics: ["Definition & properties", "Standard transforms", "Inverse Laplace transform"] },
        { name: "Solving ODEs", subtopics: ["Initial value problems", "Step & impulse functions"] },
        { name: "Applications", subtopics: ["Control systems intro", "Transfer functions"] },
      ]},
      { number: 3, title: "Fourier Series & PDEs", hours: 10, topics: [
        { name: "Fourier Series", subtopics: ["Euler's formulae", "Even & odd functions", "Half-range series"] },
        { name: "PDEs", subtopics: ["Wave equation", "Heat equation", "Laplace equation"] },
        { name: "Fourier Transform", subtopics: ["Fourier integral theorem", "FT properties"] },
      ]},
      { number: 4, title: "Probability & Statistics", hours: 8, topics: [
        { name: "Probability", subtopics: ["Sample space & events", "Conditional probability", "Bayes' theorem"] },
        { name: "Distributions", subtopics: ["Binomial", "Poisson", "Normal distribution"] },
        { name: "Statistics", subtopics: ["Mean, median, mode", "Correlation & regression"] },
      ]},
      { number: 5, title: "Numerical Methods", hours: 10, topics: [
        { name: "Root Finding", subtopics: ["Bisection method", "Newton-Raphson", "Regula Falsi"] },
        { name: "Interpolation", subtopics: ["Newton's forward & backward differences", "Lagrange interpolation"] },
        { name: "Numerical Integration & ODE", subtopics: ["Trapezoidal rule", "Simpson's rule", "Euler's & RK4 methods"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Solve first and higher-order ODEs and apply them to engineering." },
      { id: "CO2", description: "Apply Laplace transforms to solve ODEs with initial conditions." },
      { id: "CO3", description: "Expand functions in Fourier series and solve basic PDEs." },
      { id: "CO4", description: "Apply probability distributions and statistical methods." },
      { id: "CO5", description: "Implement numerical methods for root-finding and integration." },
    ],
    books: {
      textbooks: [
        { author: "B.S. Grewal", title: "Higher Engineering Mathematics", edition: "44th", publisher: "Khanna Publishers" },
        { author: "Erwin Kreyszig", title: "Advanced Engineering Mathematics", edition: "10th", publisher: "Wiley" },
      ],
      references: [
        { author: "Dennis G. Zill", title: "A First Course in Differential Equations", edition: "11th", publisher: "Cengage" },
        { author: "S.C. Gupta, V.K. Kapoor", title: "Fundamentals of Mathematical Statistics", edition: "12th", publisher: "Sultan Chand" },
      ],
      online: [
        { title: "Khan Academy - Differential Equations", url: "https://khanacademy.org/math/differential-equations" },
        { title: "NPTEL: Mathematics-II", url: "https://nptel.ac.in" },
        { title: "Wolfram Alpha", url: "https://wolframalpha.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "BSC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of Mathematics" },
  },

  "Software Development Fundamentals-II": {
    code: "CS-102",
    title: "Software Development Fundamentals-II (OOP with C++)",
    credits: { L: 3, T: 0, P: 2 },
    semester: 2,
    branch: "CSE / IT",
    prerequisites: ["Software Development Fundamentals-I"],
    objectives: [
      "Understand Object-Oriented Programming concepts using C++.",
      "Learn classes, objects, inheritance, polymorphism, and encapsulation.",
      "Apply exception handling and template-based generic programming.",
      "Use the C++ Standard Template Library (STL) effectively.",
      "Develop moderately complex software using OOP design principles.",
    ],
    units: [
      { number: 1, title: "OOP Concepts & C++ Basics", hours: 8, topics: [
        { name: "OOP Principles", subtopics: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"] },
        { name: "Classes & Objects", subtopics: ["Access specifiers", "Constructors & destructors", "this pointer"] },
        { name: "Operator Overloading", subtopics: ["Unary & binary operators", "Friend functions"] },
      ]},
      { number: 2, title: "Inheritance & Polymorphism", hours: 10, topics: [
        { name: "Inheritance", subtopics: ["Single, multiple, multilevel, hybrid", "Constructor calls", "Virtual base classes"] },
        { name: "Polymorphism", subtopics: ["Function overloading", "Virtual functions", "Abstract classes"] },
        { name: "Dynamic Binding", subtopics: ["Early vs late binding", "vtable concept"] },
      ]},
      { number: 3, title: "Templates & Exception Handling", hours: 8, topics: [
        { name: "Templates", subtopics: ["Function templates", "Class templates", "Template specialisation"] },
        { name: "Exception Handling", subtopics: ["try, catch, throw", "Multiple catch blocks", "User-defined exceptions"] },
        { name: "Namespaces", subtopics: ["namespace std", "Custom namespaces"] },
      ]},
      { number: 4, title: "STL", hours: 8, topics: [
        { name: "Containers", subtopics: ["vector, list, deque", "set, map, unordered_map", "stack, queue, priority_queue"] },
        { name: "Iterators & Algorithms", subtopics: ["sort, find, count, reverse", "Lambda expressions"] },
        { name: "Strings", subtopics: ["std::string operations", "stringstream"] },
      ]},
      { number: 5, title: "Modern C++ & Introduction to Python", hours: 6, topics: [
        { name: "Modern C++ Features", subtopics: ["auto keyword", "Range-based for loop", "Smart pointers: unique_ptr, shared_ptr"] },
        { name: "File Streams", subtopics: ["ifstream, ofstream, fstream"] },
        { name: "Python Intro", subtopics: ["Variables, lists, dicts", "Functions", "OOP in Python"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design and implement classes using OOP principles in C++." },
      { id: "CO2", description: "Apply inheritance and polymorphism to build extensible software." },
      { id: "CO3", description: "Use templates and exception handling for robust generic code." },
      { id: "CO4", description: "Effectively use STL containers and algorithms." },
      { id: "CO5", description: "Write file I/O programs and use modern C++ features." },
    ],
    books: {
      textbooks: [
        { author: "Bjarne Stroustrup", title: "The C++ Programming Language", edition: "4th", publisher: "Addison-Wesley" },
        { author: "E. Balagurusamy", title: "Object Oriented Programming with C++", edition: "8th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Scott Meyers", title: "Effective Modern C++", edition: "1st", publisher: "O'Reilly" },
        { author: "Stanley B. Lippman", title: "C++ Primer", edition: "5th", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "cppreference.com", url: "https://cppreference.com" },
        { title: "learncpp.com", url: "https://learncpp.com" },
        { title: "NPTEL: Programming in C++", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  // ─── Semester 3 (additional) ─────────────────────────────────────────────

  "Theory of Computation": {
    code: "CS-203",
    title: "Theory of Computation",
    credits: { L: 3, T: 0, P: 0 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["Mathematics-I", "Mathematics-II"],
    objectives: [
      "Understand formal models of computation: finite automata, pushdown automata, and Turing machines.",
      "Construct and minimise deterministic and non-deterministic finite automata.",
      "Study context-free grammars and pushdown automata.",
      "Explore decidability: the halting problem and undecidable problems.",
      "Classify computational problems into P, NP, NP-hard, and NP-complete.",
    ],
    units: [
      { number: 1, title: "Finite Automata & Regular Languages", hours: 10, topics: [
        { name: "DFA & NFA", subtopics: ["DFA definition", "NFA definition", "NFA to DFA conversion", "Epsilon-NFA"] },
        { name: "Regular Expressions", subtopics: ["RE to NFA", "DFA to RE", "Properties of regular languages"] },
        { name: "Pumping Lemma", subtopics: ["Proof of non-regularity"] },
        { name: "DFA Minimisation", subtopics: ["Myhill-Nerode theorem", "Table-filling algorithm"] },
      ]},
      { number: 2, title: "Context-Free Grammars", hours: 10, topics: [
        { name: "CFG Basics", subtopics: ["Productions, derivations", "Parse trees", "Ambiguity"] },
        { name: "Normal Forms", subtopics: ["Chomsky Normal Form (CNF)", "Greibach Normal Form (GNF)"] },
        { name: "Simplification", subtopics: ["Removal of unit productions", "Useless symbols", "Epsilon productions"] },
      ]},
      { number: 3, title: "Pushdown Automata", hours: 8, topics: [
        { name: "PDA", subtopics: ["DPDA vs NPDA", "Acceptance by final state & empty stack"] },
        { name: "CFG to PDA", subtopics: ["Equivalence of CFG and PDA"] },
        { name: "Pumping Lemma for CFLs", subtopics: ["Non-CFL examples"] },
      ]},
      { number: 4, title: "Turing Machines", hours: 10, topics: [
        { name: "Turing Machine Model", subtopics: ["Formal definition", "Configurations & transitions", "Variants"] },
        { name: "Church-Turing Thesis", subtopics: ["Universal TM"] },
        { name: "TM Constructions", subtopics: ["TM for arithmetic", "TM composition"] },
      ]},
      { number: 5, title: "Decidability & Complexity", hours: 10, topics: [
        { name: "Decidability", subtopics: ["Recursive & r.e. languages", "Halting problem", "Rice's theorem"] },
        { name: "Reductions", subtopics: ["Many-one reductions", "Proving undecidability"] },
        { name: "Complexity", subtopics: ["P vs NP", "NP-complete: Cook-Levin theorem"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Construct DFA, NFA, and minimise automata for given languages." },
      { id: "CO2", description: "Design CFGs and convert to normal forms." },
      { id: "CO3", description: "Build PDA for context-free languages." },
      { id: "CO4", description: "Design Turing machines for computational problems." },
      { id: "CO5", description: "Classify problems by decidability and complexity." },
    ],
    books: {
      textbooks: [
        { author: "Michael Sipser", title: "Introduction to the Theory of Computation", edition: "3rd", publisher: "Cengage" },
        { author: "Hopcroft, Motwani, Ullman", title: "Introduction to Automata Theory, Languages and Computation", edition: "3rd", publisher: "Pearson" },
      ],
      references: [
        { author: "Peter Linz", title: "An Introduction to Formal Languages and Automata", edition: "6th", publisher: "Jones & Bartlett" },
      ],
      online: [
        { title: "NPTEL: Theory of Computation", url: "https://nptel.ac.in" },
        { title: "Automata Tutor", url: "https://automatatutor.com" },
        { title: "MIT OCW: Theory of Computation", url: "https://ocw.mit.edu/courses/18-404j" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  // ─── Semester 6 ──────────────────────────────────────────────────────────

  "Web Technology": {
    code: "CS-501",
    title: "Web Technology",
    credits: { L: 3, T: 0, P: 2 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Software Development Fundamentals-II", "Database Management Systems"],
    objectives: [
      "Understand the architecture of the Web and HTTP protocol.",
      "Build structured web pages using HTML5 and style with CSS3.",
      "Add interactivity using JavaScript and modern frameworks.",
      "Develop server-side applications using Node.js and Express.",
      "Integrate databases and build full-stack web applications.",
    ],
    units: [
      { number: 1, title: "Web Fundamentals & HTML5", hours: 8, topics: [
        { name: "Web Architecture", subtopics: ["Client-server model", "HTTP/HTTPS methods", "URL structure"] },
        { name: "HTML5", subtopics: ["Semantic tags", "Forms & input types", "Tables, lists, media", "Canvas basics"] },
        { name: "Accessibility", subtopics: ["ARIA roles", "Semantic HTML"] },
      ]},
      { number: 2, title: "CSS3 & Responsive Design", hours: 8, topics: [
        { name: "CSS Fundamentals", subtopics: ["Selectors, specificity", "Box model", "Positioning"] },
        { name: "Modern CSS", subtopics: ["Flexbox", "CSS Grid", "CSS variables"] },
        { name: "Responsive Design", subtopics: ["Media queries", "Mobile-first", "Viewport units"] },
      ]},
      { number: 3, title: "JavaScript & DOM", hours: 10, topics: [
        { name: "JavaScript Fundamentals", subtopics: ["Variables, types, operators", "Functions, closures", "ES6+: arrow functions, destructuring, modules"] },
        { name: "DOM Manipulation", subtopics: ["Selecting elements", "Event handling", "Dynamic content"] },
        { name: "Async JavaScript", subtopics: ["Promises", "async/await", "Fetch API"] },
      ]},
      { number: 4, title: "Node.js & Express", hours: 8, topics: [
        { name: "Node.js", subtopics: ["Event loop", "npm", "Built-in modules"] },
        { name: "Express.js", subtopics: ["Routing", "Middleware", "REST APIs"] },
        { name: "Testing", subtopics: ["Postman", "Jest basics"] },
      ]},
      { number: 5, title: "Database & Deployment", hours: 8, topics: [
        { name: "MongoDB", subtopics: ["Documents & collections", "CRUD", "Mongoose ODM"] },
        { name: "Authentication", subtopics: ["JWT tokens", "bcrypt", "Sessions"] },
        { name: "Deployment", subtopics: ["Vercel / Render", "Environment variables", "CI/CD basics"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Build accessible web pages using HTML5 and CSS3." },
      { id: "CO2", description: "Design responsive layouts using Flexbox and CSS Grid." },
      { id: "CO3", description: "Write interactive JavaScript using modern ES6+ features." },
      { id: "CO4", description: "Develop RESTful backend APIs using Node.js and Express." },
      { id: "CO5", description: "Build and deploy a full-stack web application." },
    ],
    books: {
      textbooks: [
        { author: "Jon Duckett", title: "HTML & CSS: Design and Build Web Sites", edition: "1st", publisher: "Wiley" },
        { author: "Nicholas C. Zakas", title: "Professional JavaScript for Web Developers", edition: "4th", publisher: "Wiley" },
      ],
      references: [
        { author: "Ethan Brown", title: "Web Development with Node and Express", edition: "2nd", publisher: "O'Reilly" },
        { author: "Marijn Haverbeke", title: "Eloquent JavaScript", edition: "3rd", publisher: "No Starch Press" },
      ],
      online: [
        { title: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { title: "The Odin Project", url: "https://theodinproject.com" },
        { title: "freeCodeCamp", url: "https://freecodecamp.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },
  // ─── Semester 1 (remaining) ───────────────────────────────────────────────

  "English": {
    code: "HS-101",
    title: "English Communication Skills",
    credits: { L: 1, T: 0, P: 1 },
    semester: 1,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Develop effective written and oral communication skills for professional contexts.",
      "Improve grammar, vocabulary, and sentence construction.",
      "Write technical documents: emails, reports, and proposals.",
      "Practice presentation and group discussion skills.",
      "Understand and apply reading comprehension strategies.",
    ],
    units: [
      { number: 1, title: "Grammar & Vocabulary", hours: 6, topics: [
        { name: "Grammar Essentials", subtopics: ["Parts of speech", "Tenses", "Subject-verb agreement", "Articles & prepositions"] },
        { name: "Vocabulary", subtopics: ["Word formation", "Synonyms & antonyms", "Idioms & phrases", "Academic word list"] },
        { name: "Sentence Construction", subtopics: ["Simple, compound, complex sentences", "Common errors"] },
      ]},
      { number: 2, title: "Reading & Comprehension", hours: 5, topics: [
        { name: "Reading Skills", subtopics: ["Skimming & scanning", "Inferencing", "Note-making"] },
        { name: "Technical Reading", subtopics: ["Reading academic texts", "Identifying main idea & supporting details"] },
      ]},
      { number: 3, title: "Writing Skills", hours: 7, topics: [
        { name: "Professional Writing", subtopics: ["Formal & informal emails", "Memos & notices"] },
        { name: "Technical Documents", subtopics: ["Project reports", "Lab reports", "Proposals"] },
        { name: "Academic Writing", subtopics: ["Essay writing", "Paragraph structure", "Referencing basics"] },
      ]},
      { number: 4, title: "Speaking & Presentation", hours: 6, topics: [
        { name: "Oral Communication", subtopics: ["Phonetics & pronunciation", "Stress & intonation"] },
        { name: "Presentations", subtopics: ["Structuring a talk", "Body language", "Visual aids"] },
        { name: "Group Discussions", subtopics: ["Techniques", "Debate", "Mock GD practice"] },
      ]},
      { number: 5, title: "Interview & Soft Skills", hours: 6, topics: [
        { name: "Interview Skills", subtopics: ["Resume writing", "HR question types", "Mock interviews"] },
        { name: "Soft Skills", subtopics: ["Time management", "Teamwork", "Conflict resolution"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Write grammatically correct and professional documents." },
      { id: "CO2", description: "Comprehend and summarise technical and academic texts." },
      { id: "CO3", description: "Draft formal emails, reports, and technical proposals." },
      { id: "CO4", description: "Deliver structured presentations with confidence." },
      { id: "CO5", description: "Perform effectively in group discussions and interviews." },
    ],
    books: {
      textbooks: [
        { author: "Meenakshi Raman, Sangeetha Sharma", title: "Technical Communication", edition: "3rd", publisher: "Oxford University Press" },
        { author: "Wren & Martin", title: "High School English Grammar and Composition", edition: "Revised", publisher: "S. Chand" },
      ],
      references: [
        { author: "Raymond Murphy", title: "English Grammar in Use", edition: "4th", publisher: "Cambridge University Press" },
        { author: "Barun Mitra", title: "Personality Development and Soft Skills", edition: "1st", publisher: "Oxford University Press" },
      ],
      online: [
        { title: "Grammarly — Writing Assistant", url: "https://grammarly.com" },
        { title: "BBC Learning English", url: "https://bbc.co.uk/learningenglish" },
        { title: "Coursera: Business English Communication", url: "https://coursera.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 20 },
      { component: "Attendance", weightage: 10 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-07", faculty: "Dept. of Humanities & Social Sciences" },
  },

  // ─── Semester 2 (remaining) ───────────────────────────────────────────────

  "Physics-II": {
    code: "PH-102",
    title: "Engineering Physics-II",
    credits: { L: 3, T: 1, P: 0 },
    semester: 2,
    branch: "All B.Tech",
    prerequisites: ["Physics-I"],
    objectives: [
      "Apply thermodynamic laws and concepts to engineering systems.",
      "Understand solid-state physics: crystal structures, band theory, and semiconductors.",
      "Study superconductivity and its modern applications.",
      "Understand dielectric and magnetic properties of materials.",
      "Apply nanoscience and nanotechnology fundamentals to engineering.",
    ],
    units: [
      { number: 1, title: "Thermodynamics", hours: 8, topics: [
        { name: "Laws of Thermodynamics", subtopics: ["Zeroth, First, Second laws", "Entropy", "Third law"] },
        { name: "Thermodynamic Cycles", subtopics: ["Carnot cycle", "Rankine cycle", "Efficiency"] },
        { name: "Statistical Mechanics", subtopics: ["Maxwell-Boltzmann distribution", "Partition function basics"] },
      ]},
      { number: 2, title: "Solid State Physics", hours: 10, topics: [
        { name: "Crystal Structure", subtopics: ["Unit cell, lattice", "Bravais lattices", "Miller indices", "X-ray diffraction: Bragg's law"] },
        { name: "Free Electron Theory", subtopics: ["Drude model", "Fermi energy", "Density of states"] },
        { name: "Band Theory", subtopics: ["Energy bands", "Metals, semiconductors, insulators"] },
      ]},
      { number: 3, title: "Semiconductors", hours: 8, topics: [
        { name: "Intrinsic & Extrinsic", subtopics: ["Carrier concentration", "n-type & p-type semiconductors"] },
        { name: "Carrier Transport", subtopics: ["Drift & diffusion", "Hall effect", "Mobility"] },
        { name: "PN Junction", subtopics: ["Built-in potential", "Depletion width", "LED & photodetector basics"] },
      ]},
      { number: 4, title: "Superconductivity & Dielectrics", hours: 8, topics: [
        { name: "Superconductivity", subtopics: ["Meissner effect", "Type I & II superconductors", "BCS theory (overview)", "Applications: MRI, maglev"] },
        { name: "Dielectric Properties", subtopics: ["Polarisation", "Dielectric constant", "Piezoelectric & ferroelectric materials"] },
        { name: "Magnetic Materials", subtopics: ["Dia, para, ferro, ferrimagnetism", "Hysteresis", "Hard & soft magnets"] },
      ]},
      { number: 5, title: "Nanoscience & Nanotechnology", hours: 8, topics: [
        { name: "Nano Basics", subtopics: ["Quantum confinement", "Surface to volume ratio", "Size-dependent properties"] },
        { name: "Nanostructures", subtopics: ["Quantum dots, nanowires, nanotubes", "Graphene properties"] },
        { name: "Synthesis Methods", subtopics: ["Top-down & bottom-up approaches", "CVD, sol-gel"] },
        { name: "Applications", subtopics: ["Nano-electronics", "Drug delivery", "Nano-sensors"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply laws of thermodynamics to analyse engineering systems." },
      { id: "CO2", description: "Explain crystal structures and use X-ray diffraction results." },
      { id: "CO3", description: "Analyse semiconductor behaviour and carrier transport mechanisms." },
      { id: "CO4", description: "Describe superconductivity, dielectric, and magnetic properties." },
      { id: "CO5", description: "Explain quantum confinement and applications of nanotechnology." },
    ],
    books: {
      textbooks: [
        { author: "H.K. Malik, A.K. Singh", title: "Engineering Physics", edition: "2nd", publisher: "McGraw-Hill" },
        { author: "C. Kittel", title: "Introduction to Solid State Physics", edition: "8th", publisher: "Wiley" },
      ],
      references: [
        { author: "D. Halliday, R. Resnick, J. Walker", title: "Fundamentals of Physics", edition: "10th", publisher: "Wiley" },
        { author: "S.O. Pillai", title: "Solid State Physics", edition: "8th", publisher: "New Age International" },
      ],
      online: [
        { title: "NPTEL: Engineering Physics II", url: "https://nptel.ac.in" },
        { title: "HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu" },
        { title: "MIT OCW: Solid-State Chemistry", url: "https://ocw.mit.edu/courses/3-091sc" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "BSC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of Physics" },
  },

  "Universal Human Values (UHV)": {
    code: "HS-103",
    title: "Universal Human Values and Professional Ethics",
    credits: { L: 2, T: 1, P: 0 },
    semester: 2,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Understand the concept of value education and its relevance to engineering profession.",
      "Explore harmony at different levels: self, family, society, and nature.",
      "Develop a holistic perspective toward happiness and prosperity.",
      "Understand professional ethics and responsibilities of an engineer.",
      "Apply human values in personal and professional decision-making.",
    ],
    units: [
      { number: 1, title: "Introduction to Value Education", hours: 8, topics: [
        { name: "Need for Value Education", subtopics: ["Right understanding, relationship, physical facility", "Happiness vs pleasure", "Natural acceptance"] },
        { name: "Human Being", subtopics: ["Body & self", "Needs of self: happiness, knowledge", "Needs of body: physical facility"] },
      ]},
      { number: 2, title: "Harmony in Human Relationships", hours: 8, topics: [
        { name: "Family Relationships", subtopics: ["Feelings in relationships", "Trust, respect, affection, care", "Right evaluation of feelings"] },
        { name: "Social Harmony", subtopics: ["Undivided society", "Universal order", "Justice & rule-based social order"] },
      ]},
      { number: 3, title: "Harmony in Society & Nature", hours: 8, topics: [
        { name: "Harmony in Nature", subtopics: ["Interconnectedness", "Co-existence of units", "Self-regulation in nature"] },
        { name: "Harmony at the level of existence", subtopics: ["Space, units, energy", "Natural order"] },
      ]},
      { number: 4, title: "Professional Ethics", hours: 8, topics: [
        { name: "Ethics Fundamentals", subtopics: ["Morality vs ethics", "Ethical theories: utilitarian, deontological"] },
        { name: "Engineering Ethics", subtopics: ["Rights & responsibilities of engineers", "Codes of ethics (IEEE, ASME)", "Whistle-blowing"] },
        { name: "Case Studies", subtopics: ["Bhopal gas tragedy", "Challenger disaster", "Cybersecurity ethics"] },
      ]},
      { number: 5, title: "Practical Applications", hours: 8, topics: [
        { name: "Self-Assessment", subtopics: ["Identifying values", "Goal setting"] },
        { name: "Environmental Ethics", subtopics: ["Sustainable development", "Carbon footprint", "Engineer's responsibility to nature"] },
        { name: "Societal Issues", subtopics: ["Corruption", "Inclusivity", "Social justice"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Articulate the need for value education in engineering profession." },
      { id: "CO2", description: "Identify the feelings required for harmonious human relationships." },
      { id: "CO3", description: "Explain the interconnectedness of humans with nature and society." },
      { id: "CO4", description: "Apply engineering codes of ethics to professional dilemmas." },
      { id: "CO5", description: "Practice sustainable and responsible engineering." },
    ],
    books: {
      textbooks: [
        { author: "R.R. Gaur, R. Sangal, G.P. Bagaria", title: "A Foundation Course in Human Values and Professional Ethics", edition: "2nd", publisher: "Excel Books" },
        { author: "Charles E. Harris Jr., Michael S. Pritchard, Michael J. Rabins", title: "Engineering Ethics", edition: "5th", publisher: "Cengage" },
      ],
      references: [
        { author: "Mike W. Martin, Roland Schinzinger", title: "Introduction to Engineering Ethics", edition: "2nd", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "NPTEL: Human Values and Professional Ethics", url: "https://nptel.ac.in" },
        { title: "Ethics in Engineering (MIT OCW)", url: "https://ocw.mit.edu" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-07", faculty: "Dept. of Humanities & Social Sciences" },
  },

  // ─── Semester 3 (remaining) ───────────────────────────────────────────────

  "Mathematical Foundations for AI & Data Science": {
    code: "MA-201",
    title: "Mathematical Foundations for AI and Data Science",
    credits: { L: 3, T: 0, P: 0 },
    semester: 3,
    branch: "CSE",
    prerequisites: ["Mathematics-I", "Mathematics-II"],
    objectives: [
      "Understand linear algebra concepts essential for machine learning algorithms.",
      "Apply probability theory and Bayesian inference to data science problems.",
      "Study optimisation techniques used in training ML models.",
      "Understand graph theory and its applications in AI.",
      "Apply statistical learning theory and information theory fundamentals.",
    ],
    units: [
      { number: 1, title: "Linear Algebra for ML", hours: 10, topics: [
        { name: "Vectors & Matrices", subtopics: ["Vector spaces", "Basis & dimension", "Linear transformations", "Matrix norms"] },
        { name: "Decompositions", subtopics: ["LU decomposition", "QR decomposition", "Singular Value Decomposition (SVD)", "PCA via SVD"] },
        { name: "Eigenanalysis", subtopics: ["Eigenvalues & eigenvectors", "Spectral theorem", "Positive definite matrices"] },
      ]},
      { number: 2, title: "Probability & Statistics", hours: 10, topics: [
        { name: "Probability Basics", subtopics: ["Probability spaces", "Conditional probability", "Bayes theorem", "Law of total probability"] },
        { name: "Random Variables", subtopics: ["Expectation, variance, covariance", "Common distributions: Gaussian, Bernoulli, Poisson, Exponential"] },
        { name: "Statistical Estimation", subtopics: ["MLE", "MAP estimation", "Confidence intervals", "Hypothesis testing"] },
      ]},
      { number: 3, title: "Optimisation", hours: 8, topics: [
        { name: "Unconstrained Optimisation", subtopics: ["Gradient descent (GD)", "Stochastic GD", "Momentum, RMSProp, Adam"] },
        { name: "Constrained Optimisation", subtopics: ["Lagrange multipliers", "KKT conditions"] },
        { name: "Convex Optimisation", subtopics: ["Convex functions", "Duality", "Applications in SVM"] },
      ]},
      { number: 4, title: "Information Theory", hours: 6, topics: [
        { name: "Entropy", subtopics: ["Shannon entropy", "Cross-entropy", "KL divergence"] },
        { name: "Mutual Information", subtopics: ["Definition", "Feature selection using MI"] },
        { name: "Applications", subtopics: ["Decision trees: information gain", "Loss functions in deep learning"] },
      ]},
      { number: 5, title: "Graph Theory for AI", hours: 8, topics: [
        { name: "Graph Basics", subtopics: ["Types of graphs", "Adjacency matrix & list", "Degree sequences"] },
        { name: "Graph Algorithms", subtopics: ["BFS, DFS", "Shortest path: Dijkstra, Bellman-Ford", "MST: Prim, Kruskal"] },
        { name: "Graph Neural Networks", subtopics: ["Graph convolution overview", "Knowledge graphs", "Social network analysis"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply linear algebra (SVD, PCA) to dimensionality reduction problems." },
      { id: "CO2", description: "Use probability and statistics for Bayesian inference and hypothesis testing." },
      { id: "CO3", description: "Implement gradient-based optimisation for training machine learning models." },
      { id: "CO4", description: "Apply information theory concepts to feature selection and loss functions." },
      { id: "CO5", description: "Model real-world problems using graph representations." },
    ],
    books: {
      textbooks: [
        { author: "Gilbert Strang", title: "Linear Algebra and Learning from Data", edition: "1st", publisher: "Wellesley-Cambridge Press" },
        { author: "Christopher Bishop", title: "Pattern Recognition and Machine Learning", edition: "1st", publisher: "Springer" },
      ],
      references: [
        { author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", title: "Deep Learning", publisher: "MIT Press" },
        { author: "Boyd & Vandenberghe", title: "Convex Optimization", publisher: "Cambridge University Press" },
      ],
      online: [
        { title: "3Blue1Brown: Essence of Linear Algebra", url: "https://youtube.com/3blue1brown" },
        { title: "MIT OCW: Linear Algebra (Gilbert Strang)", url: "https://ocw.mit.edu/courses/18-06sc" },
        { title: "Probability for Data Science (Prob 140)", url: "https://prob140.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "BSC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of Mathematics" },
  },

  "Object Oriented Programming Using Java": {
    code: "CS-204",
    title: "Object Oriented Programming Using Java",
    credits: { L: 1, T: 0, P: 0 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["Software Development Fundamentals-II"],
    objectives: [
      "Understand Java syntax and object-oriented programming in Java.",
      "Work with Java collections, generics, and the Java Stream API.",
      "Handle exceptions and perform file I/O using Java libraries.",
      "Write multi-threaded programs using Java concurrency utilities.",
      "Build simple GUI applications or REST APIs using Java frameworks.",
    ],
    units: [
      { number: 1, title: "Java Fundamentals & OOP", hours: 6, topics: [
        { name: "Java Basics", subtopics: ["JVM, JRE, JDK", "Data types, operators", "Control flow", "Arrays & strings"] },
        { name: "Classes & Objects", subtopics: ["Access modifiers", "Constructors", "this & static", "Packages & imports"] },
        { name: "Inheritance & Polymorphism", subtopics: ["extends & implements", "Method overriding", "abstract & interface"] },
      ]},
      { number: 2, title: "Java Collections & Generics", hours: 5, topics: [
        { name: "Collections Framework", subtopics: ["List: ArrayList, LinkedList", "Set: HashSet, TreeSet", "Map: HashMap, TreeMap"] },
        { name: "Generics", subtopics: ["Generic classes & methods", "Bounded type parameters"] },
        { name: "Iterators & Comparators", subtopics: ["Iterator pattern", "Comparable vs Comparator"] },
      ]},
      { number: 3, title: "Exception Handling & I/O", hours: 5, topics: [
        { name: "Exception Handling", subtopics: ["try-catch-finally", "Custom exceptions", "Checked vs unchecked"] },
        { name: "File I/O", subtopics: ["File, FileReader, FileWriter", "BufferedReader & Scanner", "Serialisation"] },
        { name: "Java NIO", subtopics: ["Path, Files API", "try-with-resources"] },
      ]},
      { number: 4, title: "Multithreading", hours: 5, topics: [
        { name: "Thread Basics", subtopics: ["Thread class & Runnable", "Thread lifecycle", "join, sleep, yield"] },
        { name: "Synchronisation", subtopics: ["synchronized keyword", "wait & notify", "Deadlock"] },
        { name: "Concurrency Utilities", subtopics: ["ExecutorService", "Future & Callable", "CountDownLatch"] },
      ]},
      { number: 5, title: "Modern Java Features", hours: 5, topics: [
        { name: "Functional Programming", subtopics: ["Lambda expressions", "Functional interfaces", "Stream API: filter, map, reduce"] },
        { name: "Java 8+ Features", subtopics: ["Optional class", "Default & static interface methods", "var keyword (Java 10+)"] },
        { name: "Build Tools & Intro to Spring", subtopics: ["Maven / Gradle basics", "Spring Boot hello-world"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Write Java programs using OOP principles (inheritance, polymorphism)." },
      { id: "CO2", description: "Use Java collections and generics for data manipulation." },
      { id: "CO3", description: "Handle exceptions and perform file I/O operations in Java." },
      { id: "CO4", description: "Write multithreaded Java programs using synchronisation." },
      { id: "CO5", description: "Apply lambda expressions and Stream API for functional-style programming." },
    ],
    books: {
      textbooks: [
        { author: "Herbert Schildt", title: "Java: The Complete Reference", edition: "12th", publisher: "McGraw-Hill" },
        { author: "Cay S. Horstmann", title: "Core Java Volume I — Fundamentals", edition: "12th", publisher: "Pearson" },
      ],
      references: [
        { author: "Joshua Bloch", title: "Effective Java", edition: "3rd", publisher: "Addison-Wesley" },
        { author: "Bruce Eckel", title: "Thinking in Java", edition: "4th", publisher: "Prentice Hall" },
      ],
      online: [
        { title: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial" },
        { title: "Baeldung — Java Guides", url: "https://baeldung.com" },
        { title: "NPTEL: Programming in Java", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Economics": {
    code: "HS-201",
    title: "Economics for Engineers",
    credits: { L: 3, T: 0, P: 0 },
    semester: 3,
    branch: "All B.Tech",
    prerequisites: [],
    objectives: [
      "Understand basic microeconomic and macroeconomic concepts.",
      "Apply demand-supply analysis to real-world markets.",
      "Understand national income, inflation, and monetary policy.",
      "Analyse cost and production theory relevant to engineering decisions.",
      "Apply engineering economics: time value of money and project evaluation.",
    ],
    units: [
      { number: 1, title: "Introduction & Demand-Supply", hours: 8, topics: [
        { name: "Basic Concepts", subtopics: ["Scarcity, choice, opportunity cost", "Micro vs macro economics", "Economic systems"] },
        { name: "Demand Analysis", subtopics: ["Law of demand", "Elasticity of demand", "Determinants of demand"] },
        { name: "Supply Analysis", subtopics: ["Law of supply", "Market equilibrium", "Price ceiling & floor"] },
      ]},
      { number: 2, title: "Production & Cost Theory", hours: 8, topics: [
        { name: "Production Theory", subtopics: ["Production function", "Laws of returns", "Isoquants & isocosts"] },
        { name: "Cost Analysis", subtopics: ["Fixed, variable, total costs", "Average & marginal costs", "Economies of scale"] },
        { name: "Market Structures", subtopics: ["Perfect competition", "Monopoly", "Oligopoly"] },
      ]},
      { number: 3, title: "National Income & GDP", hours: 8, topics: [
        { name: "National Income", subtopics: ["GDP, GNP, NNP", "Methods: output, income, expenditure", "Nominal vs real GDP"] },
        { name: "Inflation", subtopics: ["CPI, WPI", "Causes & effects", "Stagflation"] },
        { name: "Business Cycles", subtopics: ["Expansion, peak, recession, trough"] },
      ]},
      { number: 4, title: "Money, Banking & Policy", hours: 8, topics: [
        { name: "Money & Banking", subtopics: ["Functions of money", "Commercial banks", "Credit creation"] },
        { name: "Central Banking", subtopics: ["Reserve Bank of India", "CRR, SLR, Repo rate, Reverse repo"] },
        { name: "Fiscal & Monetary Policy", subtopics: ["Government expenditure & taxation", "Deficit financing", "Inflation targeting"] },
      ]},
      { number: 5, title: "Engineering Economics", hours: 8, topics: [
        { name: "Time Value of Money", subtopics: ["Simple & compound interest", "Present & future value", "Annuities & EMI"] },
        { name: "Project Evaluation", subtopics: ["Net Present Value (NPV)", "Internal Rate of Return (IRR)", "Payback period"] },
        { name: "Depreciation", subtopics: ["Straight-line", "Written down value", "Sinking fund methods"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply demand-supply analysis to interpret market behaviour." },
      { id: "CO2", description: "Analyse production and cost functions for engineering firms." },
      { id: "CO3", description: "Interpret national income statistics and inflation measures." },
      { id: "CO4", description: "Explain monetary and fiscal policy tools used by RBI and government." },
      { id: "CO5", description: "Evaluate engineering projects using NPV, IRR, and payback period." },
    ],
    books: {
      textbooks: [
        { author: "N. Gregory Mankiw", title: "Principles of Economics", edition: "9th", publisher: "Cengage" },
        { author: "Prasanna Chandra", title: "Financial Management", edition: "10th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Paul A. Samuelson, William D. Nordhaus", title: "Economics", edition: "19th", publisher: "McGraw-Hill" },
        { author: "Donald G. Newnan", title: "Engineering Economic Analysis", edition: "13th", publisher: "Oxford University Press" },
      ],
      online: [
        { title: "Khan Academy: Economics", url: "https://khanacademy.org/economics-finance-domain" },
        { title: "NPTEL: Engineering Economics", url: "https://nptel.ac.in" },
        { title: "RBI Website — Monetary Policy", url: "https://rbi.org.in" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-07", faculty: "Dept. of Humanities & Social Sciences" },
  },

  // ─── Semester 4 (remaining) ───────────────────────────────────────────────

  "Digital Systems and Computer Organisation": {
    code: "CS-303",
    title: "Digital Systems and Computer Organisation",
    credits: { L: 3, T: 1, P: 0 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Basic Electronics"],
    objectives: [
      "Design and simplify combinational circuits using Boolean algebra and K-maps.",
      "Design sequential circuits: flip-flops, counters, and registers.",
      "Understand computer organisation: ALU, control unit, memory hierarchy.",
      "Study instruction set architecture (ISA) and assembly language basics.",
      "Understand I/O organisation, interrupts, and memory management.",
    ],
    units: [
      { number: 1, title: "Combinational Logic Design", hours: 10, topics: [
        { name: "Boolean Algebra", subtopics: ["Postulates & theorems", "SOP & POS forms", "Canonical forms"] },
        { name: "Simplification", subtopics: ["K-Map: 2, 3, 4, 5-variable", "Quine-McCluskey method"] },
        { name: "Combinational Circuits", subtopics: ["Adders, subtractors", "Multiplexers & demultiplexers", "Encoders & decoders", "Comparators", "Code converters"] },
      ]},
      { number: 2, title: "Sequential Logic Design", hours: 10, topics: [
        { name: "Flip-Flops", subtopics: ["SR, JK, D, T flip-flops", "Master-slave FF", "Edge-triggering"] },
        { name: "Registers & Counters", subtopics: ["Shift registers", "Ripple & synchronous counters", "Mod-N counters", "Ring & Johnson counters"] },
        { name: "Finite State Machines", subtopics: ["Mealy & Moore models", "State diagram & table", "State minimisation"] },
      ]},
      { number: 3, title: "Computer Organisation Basics", hours: 8, topics: [
        { name: "Computer Components", subtopics: ["Von Neumann architecture", "CPU, memory, I/O", "Registers: PC, IR, MAR, MDR, ACC"] },
        { name: "ALU Design", subtopics: ["Binary addition/subtraction", "Overflow detection", "BCD arithmetic"] },
        { name: "Data Representation", subtopics: ["Sign-magnitude, 2's complement", "IEEE 754 floating point", "Fixed-point arithmetic"] },
      ]},
      { number: 4, title: "Instruction Set Architecture", hours: 8, topics: [
        { name: "ISA Fundamentals", subtopics: ["Instruction types & formats", "Addressing modes: immediate, direct, indirect, indexed", "RISC vs CISC"] },
        { name: "Assembly Language", subtopics: ["x86 / MIPS basics", "Data transfer, arithmetic, logic instructions", "Branching & loops"] },
        { name: "Instruction Execution Cycle", subtopics: ["Fetch-decode-execute", "Micro-operations", "Control unit: hardwired & microprogrammed"] },
      ]},
      { number: 5, title: "Memory & I/O Organisation", hours: 8, topics: [
        { name: "Memory Hierarchy", subtopics: ["SRAM vs DRAM", "Cache: direct mapped, set associative, fully associative", "Virtual memory & TLB"] },
        { name: "I/O Organisation", subtopics: ["Programmed I/O", "Interrupt-driven I/O", "DMA"] },
        { name: "Bus Architecture", subtopics: ["Synchronous & asynchronous buses", "Arbitration", "PCI, USB overview"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design and simplify combinational circuits using K-maps." },
      { id: "CO2", description: "Design sequential circuits using flip-flops and FSMs." },
      { id: "CO3", description: "Explain computer organisation and ALU design." },
      { id: "CO4", description: "Write simple assembly language programs using addressing modes." },
      { id: "CO5", description: "Describe memory hierarchy and I/O organisation techniques." },
    ],
    books: {
      textbooks: [
        { author: "M. Morris Mano, Michael D. Ciletti", title: "Digital Design", edition: "5th", publisher: "Pearson" },
        { author: "William Stallings", title: "Computer Organization and Architecture", edition: "11th", publisher: "Pearson" },
      ],
      references: [
        { author: "David A. Patterson, John L. Hennessy", title: "Computer Organization and Design (RISC-V Edition)", edition: "2nd", publisher: "Morgan Kaufmann" },
        { author: "Andrew S. Tanenbaum", title: "Structured Computer Organization", edition: "6th", publisher: "Pearson" },
      ],
      online: [
        { title: "NPTEL: Computer Organisation and Architecture", url: "https://nptel.ac.in" },
        { title: "Nand2Tetris — Build a Computer from First Principles", url: "https://nand2tetris.org" },
        { title: "Digital Works — Logic Simulator", url: "https://sourceforge.net/projects/digitalworks" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Software Engineering": {
    code: "CS-304",
    title: "Software Engineering",
    credits: { L: 2, T: 0, P: 0 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Software Development Fundamentals-II"],
    objectives: [
      "Understand software development life cycle (SDLC) models and methodologies.",
      "Apply requirements engineering techniques: elicitation, analysis, and documentation.",
      "Design software using UML diagrams and architectural patterns.",
      "Apply software testing techniques: unit, integration, and system testing.",
      "Understand software project management: estimation, scheduling, and quality assurance.",
    ],
    units: [
      { number: 1, title: "Introduction & SDLC", hours: 8, topics: [
        { name: "Software Engineering Basics", subtopics: ["Definition, characteristics", "Software crisis", "Software myths"] },
        { name: "SDLC Models", subtopics: ["Waterfall model", "Incremental model", "Spiral model", "V-model"] },
        { name: "Agile Methodologies", subtopics: ["Scrum framework", "Kanban", "Extreme Programming (XP)", "Agile vs traditional"] },
      ]},
      { number: 2, title: "Requirements Engineering", hours: 8, topics: [
        { name: "Requirements Types", subtopics: ["Functional vs non-functional requirements", "User requirements vs system requirements"] },
        { name: "Elicitation Techniques", subtopics: ["Interviews", "Questionnaires", "Use case analysis", "Prototyping"] },
        { name: "SRS Document", subtopics: ["IEEE 830 standard", "Characteristics of good SRS", "Requirements validation"] },
      ]},
      { number: 3, title: "Software Design", hours: 8, topics: [
        { name: "Design Principles", subtopics: ["Abstraction, modularity, cohesion, coupling"] },
        { name: "UML Diagrams", subtopics: ["Use case, Class, Sequence, Activity, State diagrams"] },
        { name: "Architectural Patterns", subtopics: ["MVC, Layered, Microservices", "Repository pattern", "Design patterns: Singleton, Factory, Observer"] },
      ]},
      { number: 4, title: "Software Testing", hours: 8, topics: [
        { name: "Testing Levels", subtopics: ["Unit testing", "Integration testing", "System & acceptance testing"] },
        { name: "Testing Techniques", subtopics: ["Black-box: equivalence partitioning, boundary value analysis", "White-box: statement, branch, path coverage"] },
        { name: "Test Automation", subtopics: ["JUnit basics", "Selenium overview", "CI/CD pipelines"] },
      ]},
      { number: 5, title: "Project Management & Quality", hours: 8, topics: [
        { name: "Project Planning", subtopics: ["Work Breakdown Structure (WBS)", "PERT & Gantt charts", "Effort estimation: COCOMO model"] },
        { name: "Risk Management", subtopics: ["Risk identification", "Risk mitigation strategies"] },
        { name: "Quality Assurance", subtopics: ["ISO 9001", "CMMI levels", "Software metrics: LOC, function points, cyclomatic complexity"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Compare SDLC models and choose appropriate methodology for a project." },
      { id: "CO2", description: "Elicit, document, and validate software requirements using SRS." },
      { id: "CO3", description: "Create UML design models and apply architectural patterns." },
      { id: "CO4", description: "Design and execute test cases using black-box and white-box techniques." },
      { id: "CO5", description: "Estimate project effort, manage risks, and apply quality metrics." },
    ],
    books: {
      textbooks: [
        { author: "Ian Sommerville", title: "Software Engineering", edition: "10th", publisher: "Pearson" },
        { author: "Roger S. Pressman, Bruce R. Maxim", title: "Software Engineering: A Practitioner's Approach", edition: "9th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides", title: "Design Patterns: Elements of Reusable OO Software", edition: "1st", publisher: "Addison-Wesley" },
        { author: "Martin Fowler", title: "Refactoring: Improving the Design of Existing Code", edition: "2nd", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "NPTEL: Software Engineering", url: "https://nptel.ac.in" },
        { title: "Refactoring Guru — Design Patterns", url: "https://refactoring.guru/design-patterns" },
        { title: "Atlassian: Agile & Scrum Guides", url: "https://atlassian.com/agile" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PEC", difficulty: "Medium", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  // ─── Semester 6 (remaining) ───────────────────────────────────────────────

  "Advanced Data Structures and Algorithms": {
    code: "CS-502",
    title: "Advanced Data Structures and Algorithms",
    credits: { L: 3, T: 0, P: 2 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Data Structures", "Design and Analysis of Algorithms"],
    objectives: [
      "Master advanced tree structures: Red-Black trees, B-trees, and Segment trees.",
      "Understand advanced graph algorithms: flow networks, matching, and planarity.",
      "Apply string processing algorithms: pattern matching and suffix structures.",
      "Implement geometric algorithms for computational geometry problems.",
      "Explore randomised and approximation algorithms for NP-hard problems.",
    ],
    units: [
      { number: 1, title: "Advanced Tree Structures", hours: 10, topics: [
        { name: "Red-Black Trees", subtopics: ["Properties", "Insertion & deletion with rotations", "Comparison with AVL trees"] },
        { name: "B-Trees & B+ Trees", subtopics: ["Multi-way search trees", "Insertion & deletion", "Applications in databases"] },
        { name: "Segment Trees & Fenwick Trees", subtopics: ["Range query & update", "Lazy propagation", "Binary Indexed Tree (BIT)"] },
        { name: "Tries", subtopics: ["Standard trie", "Compressed trie", "Suffix trie", "Applications: autocomplete, IP routing"] },
      ]},
      { number: 2, title: "Advanced Graph Algorithms", hours: 10, topics: [
        { name: "Network Flow", subtopics: ["Max-flow min-cut theorem", "Ford-Fulkerson algorithm", "Edmonds-Karp algorithm", "Applications: bipartite matching"] },
        { name: "Shortest Paths (Advanced)", subtopics: ["Floyd-Warshall (all-pairs)", "Johnson's algorithm", "A* search"] },
        { name: "Strongly Connected Components", subtopics: ["Kosaraju's algorithm", "Tarjan's algorithm", "Applications"] },
        { name: "Topological Sort", subtopics: ["DFS-based", "Kahn's algorithm (BFS-based)", "Applications in scheduling"] },
      ]},
      { number: 3, title: "String Algorithms", hours: 8, topics: [
        { name: "Pattern Matching", subtopics: ["Naive algorithm", "KMP algorithm", "Boyer-Moore algorithm", "Rabin-Karp (hashing)"] },
        { name: "Suffix Structures", subtopics: ["Suffix array", "Suffix tree overview", "LCP array", "Applications in bioinformatics"] },
        { name: "Automata-based Matching", subtopics: ["Finite automaton matcher", "Aho-Corasick algorithm (multi-pattern)"] },
      ]},
      { number: 4, title: "Geometric & Advanced DP", hours: 8, topics: [
        { name: "Computational Geometry", subtopics: ["Convex hull: Graham scan, Jarvis march", "Line intersection", "Closest pair of points"] },
        { name: "Advanced DP", subtopics: ["Longest Increasing Subsequence (O(n log n))", "Digit DP", "Profile DP"] },
        { name: "Divide and Conquer Optimisation", subtopics: ["DP with divide & conquer", "Convex hull trick"] },
      ]},
      { number: 5, title: "Randomised & Approximation Algorithms", hours: 8, topics: [
        { name: "Randomised Algorithms", subtopics: ["Las Vegas vs Monte Carlo", "Randomised QuickSort", "Karger's min-cut", "Bloom filters"] },
        { name: "Approximation Algorithms", subtopics: ["Vertex cover approximation", "TSP approximation (Christofides)", "Set cover greedy"] },
        { name: "External Memory Algorithms", subtopics: ["I/O model", "External sorting", "Cache-oblivious algorithms overview"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Implement and apply Red-Black trees, segment trees, and tries." },
      { id: "CO2", description: "Apply network flow and advanced graph algorithms to optimisation problems." },
      { id: "CO3", description: "Implement efficient string matching algorithms (KMP, Aho-Corasick)." },
      { id: "CO4", description: "Solve computational geometry problems using convex hull algorithms." },
      { id: "CO5", description: "Design randomised and approximation algorithms for NP-hard problems." },
    ],
    books: {
      textbooks: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
        { author: "Jon Kleinberg, Eva Tardos", title: "Algorithm Design", edition: "1st", publisher: "Pearson" },
      ],
      references: [
        { author: "Steven S. Skiena", title: "The Algorithm Design Manual", edition: "3rd", publisher: "Springer" },
        { author: "Sanjoy Dasgupta et al.", title: "Algorithms", edition: "1st", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "CP-Algorithms (e-maxx)", url: "https://cp-algorithms.com" },
        { title: "Codeforces EDU — Algorithm Course", url: "https://codeforces.com/edu/courses" },
        { title: "USACO Guide", url: "https://usaco.guide" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 40 },
      { component: "Lab / Practical", weightage: 15 },
      { component: "Quizzes & Assignments", weightage: 10 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  "Distributed & Cloud Computing OR Info. Security & Cryptography": {
    code: "CS-503",
    title: "Distributed & Cloud Computing / Information Security & Cryptography",
    credits: { L: 3, T: 0, P: 0 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Computer Networks", "Operating Systems"],
    objectives: [
      "Understand the architecture and principles of distributed computing systems.",
      "Explore cloud computing models: IaaS, PaaS, SaaS, and cloud deployment strategies.",
      "Apply fundamental cryptographic techniques for data confidentiality and integrity.",
      "Understand network security protocols: SSL/TLS, IPSec, and authentication systems.",
      "Analyse real-world security threats and design defense strategies.",
    ],
    units: [
      { number: 1, title: "Distributed Systems Fundamentals", hours: 8, topics: [
        { name: "Distributed System Concepts", subtopics: ["Characteristics", "Transparency, scalability, fault-tolerance", "CAP theorem"] },
        { name: "Communication", subtopics: ["RPC", "Message passing", "Middleware: REST, gRPC, message queues (Kafka)"] },
        { name: "Consistency & Replication", subtopics: ["Replication models", "Eventual consistency", "Paxos & Raft consensus"] },
      ]},
      { number: 2, title: "Cloud Computing", hours: 10, topics: [
        { name: "Cloud Models", subtopics: ["IaaS, PaaS, SaaS", "Public, private, hybrid cloud"] },
        { name: "Virtualisation", subtopics: ["Hypervisors (Type 1 & 2)", "Containers vs VMs", "Docker & Kubernetes overview"] },
        { name: "Cloud Services", subtopics: ["AWS / GCP / Azure overview", "Serverless computing", "Auto-scaling & load balancing", "Cloud storage: object, block, file"] },
      ]},
      { number: 3, title: "Cryptography Basics", hours: 8, topics: [
        { name: "Symmetric Cryptography", subtopics: ["DES, 3DES", "AES (Rijndael)", "Block cipher modes: ECB, CBC, CTR"] },
        { name: "Asymmetric Cryptography", subtopics: ["RSA algorithm", "Diffie-Hellman key exchange", "Elliptic Curve Cryptography (ECC)"] },
        { name: "Hash Functions", subtopics: ["MD5, SHA family", "HMAC", "Digital signatures"] },
      ]},
      { number: 4, title: "Network Security", hours: 8, topics: [
        { name: "Security Protocols", subtopics: ["TLS/SSL handshake", "IPSec (AH, ESP)", "Kerberos authentication"] },
        { name: "PKI & Certificates", subtopics: ["X.509 certificates", "Certificate Authority (CA)", "Certificate revocation"] },
        { name: "Firewalls & IDS", subtopics: ["Packet filtering", "Stateful inspection", "IDS vs IPS", "SIEM systems"] },
      ]},
      { number: 5, title: "Security Threats & Defences", hours: 8, topics: [
        { name: "Attack Types", subtopics: ["SQL injection", "XSS", "CSRF", "Buffer overflow", "Social engineering & phishing"] },
        { name: "OWASP Top 10", subtopics: ["Injection flaws", "Broken authentication", "Sensitive data exposure"] },
        { name: "Incident Response", subtopics: ["Forensics basics", "Penetration testing overview", "Security auditing"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Explain distributed system properties and consensus algorithms." },
      { id: "CO2", description: "Deploy and manage applications on cloud platforms using containers." },
      { id: "CO3", description: "Apply symmetric and asymmetric cryptography for secure communication." },
      { id: "CO4", description: "Configure network security protocols (TLS, IPSec) and PKI." },
      { id: "CO5", description: "Identify and mitigate common web and network security vulnerabilities." },
    ],
    books: {
      textbooks: [
        { author: "Andrew S. Tanenbaum, Maarten Van Steen", title: "Distributed Systems: Principles and Paradigms", edition: "3rd", publisher: "Pearson" },
        { author: "William Stallings", title: "Cryptography and Network Security", edition: "8th", publisher: "Pearson" },
      ],
      references: [
        { author: "Rajkumar Buyya, James Broberg, Andrzej Goscinski", title: "Cloud Computing: Principles and Paradigms", edition: "1st", publisher: "Wiley" },
        { author: "Bruce Schneier", title: "Applied Cryptography", edition: "2nd", publisher: "Wiley" },
      ],
      online: [
        { title: "AWS Training & Certification (Free Tier)", url: "https://aws.amazon.com/training" },
        { title: "Cloudflare Learning Center", url: "https://cloudflare.com/learning" },
        { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Assignments", weightage: 15 },
      { component: "Attendance", weightage: 5 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-07", faculty: "Dept. of CSE & IT" },
  },

  // ─── SEMESTER 1 LABS & PRACTICALS ──────────────────────────────────────────

  "Physics Lab-I": {
    code: "25B17PH171",
    title: "Engineering Physics Laboratory - I",
    credits: { L: 0, T: 0, P: 2 },
    semester: 1,
    branch: "All B.Tech Branches",
    prerequisites: ["Senior Secondary Physics"],
    objectives: [
      "Gain hands-on experience with optical instruments, spectrometers, and interferometry.",
      "Experimentally determine the wavelength of sodium light and laser sources.",
      "Understand the Hall effect and determine the carrier concentration of semiconductors.",
      "Calculate Planck's constant and the energy band gap of semiconductor materials.",
      "Cultivate scientific experimental accuracy, error analysis, and graphing skills.",
    ],
    units: [
      { number: 1, title: "Wave Optics & Interferometry", hours: 6, topics: [
        { name: "Newton's Rings Experiment", subtopics: ["Determination of wavelength of sodium light", "Radius of curvature of plano-convex lens"] },
        { name: "Diffraction Grating", subtopics: ["Measurement of spectral lines using spectrometer", "Resolving power of grating"] },
      ]},
      { number: 2, title: "Laser & Modern Physics", hours: 6, topics: [
        { name: "Laser Diffraction", subtopics: ["Particle size measurement using He-Ne / diode laser", "Numerical aperture of optical fiber"] },
        { name: "Photoelectric Effect", subtopics: ["Determination of Planck constant using LEDs / phototube"] },
      ]},
      { number: 3, title: "Semiconductor & Magnetic Measurements", hours: 6, topics: [
        { name: "Hall Effect Experiment", subtopics: ["Hall coefficient calculation", "Carrier type and carrier concentration measurement"] },
        { name: "Energy Band Gap", subtopics: ["Reverse saturation current in P-N junction", "Band gap calculation in Ge/Si"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate precision in optical alignment and spectrometer calibration." },
      { id: "CO2", description: "Calculate physical constants (wavelength, Planck's constant) with standard error bounds." },
      { id: "CO3", description: "Analyze semiconductor carrier properties using Hall effect measurements." },
      { id: "CO4", description: "Interpret laser diffraction patterns for particulate and fiber analysis." },
      { id: "CO5", description: "Document experimental observations according to scientific laboratory standards." },
    ],
    books: {
      textbooks: [
        { author: "Dept. of Physics, JUIT", title: "Physics Laboratory Manual", edition: "2025-26", publisher: "JUIT Waknaghat" },
        { author: "C.L. Arora", title: "Practical Physics", edition: "Revised", publisher: "S. Chand" },
      ],
      references: [
        { author: "H.K. Malik, A.K. Singh", title: "Engineering Physics", edition: "2nd", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "Virtual Labs — Amrita University Optics Lab", url: "https://vlab.amrita.edu" },
        { title: "Virtual Labs — IIT Kharagpur Physical Sciences", url: "https://vlab.co.in" },
      ],
    },
    evaluation: [
      { component: "Continuous Lab Assessment", weightage: 60 },
      { component: "End-Semester Lab Exam & Viva", weightage: 40 },
    ],
    meta: { category: "BSC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Physics & Materials Science" },
  },

  "Software Development Fundamentals Lab-I": {
    code: "25B17CI172",
    title: "Software Development Fundamentals Laboratory - I",
    credits: { L: 0, T: 0, P: 2 },
    semester: 1,
    branch: "CSE / IT",
    prerequisites: ["Computer Fundamentals"],
    objectives: [
      "Master procedural problem solving and compilation in C using GCC and modern IDEs.",
      "Implement algorithms involving loops, branch statements, and modular functions.",
      "Work proficiently with 1D/2D arrays, matrices, and string manipulation routines.",
      "Apply pointer arithmetic, dynamic memory allocation, and custom struct data types.",
      "Read and write data to persistent text files using file stream operations.",
    ],
    units: [
      { number: 1, title: "Basic Syntax & Control Logic", hours: 6, topics: [
        { name: "Fundamental I/O", subtopics: ["Formatted I/O with printf/scanf", "Data type ranges and typecasting"] },
        { name: "Branching & Loops", subtopics: ["Nested if-else", "Switch-case menus", "Prime numbers, Fibonacci, series summation"] },
      ]},
      { number: 2, title: "Arrays, Strings & Functions", hours: 8, topics: [
        { name: "Array Manipulations", subtopics: ["Linear search, Binary search, Bubble sort", "Matrix addition and multiplication"] },
        { name: "String Functions", subtopics: ["Palindrome check", "String concatenation and substring without built-in library"] },
        { name: "Modular Functions", subtopics: ["Pass by value vs reference", "Recursive functions: GCD, Tower of Hanoi, Factorial"] },
      ]},
      { number: 3, title: "Pointers, Structs & File Systems", hours: 10, topics: [
        { name: "Pointer Operations", subtopics: ["Pointer arithmetic", "Dynamic memory allocation: malloc, calloc, realloc, free"] },
        { name: "Structures & Unions", subtopics: ["Student record database with structs", "Nested structures"] },
        { name: "File I/O", subtopics: ["Creating, reading, and appending text files", "Record searching in binary files"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Write, compile, debug, and execute modular C programs in Linux and Windows." },
      { id: "CO2", description: "Design efficient algorithms for searching, sorting, and matrix operations." },
      { id: "CO3", description: "Manage dynamic heap memory safely without memory leaks." },
      { id: "CO4", description: "Create structured record-keeping applications using files and structs." },
      { id: "CO5", description: "Apply debugging tools (GDB) and follow clean coding standards." },
    ],
    books: {
      textbooks: [
        { author: "Brian W. Kernighan, Dennis M. Ritchie", title: "The C Programming Language", edition: "2nd", publisher: "Prentice Hall" },
        { author: "E. Balagurusamy", title: "Programming in ANSI C", edition: "8th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "Yashavant Kanetkar", title: "Let Us C", edition: "19th", publisher: "BPB Publications" },
      ],
      online: [
        { title: "GeeksforGeeks — C Programming Language", url: "https://geeksforgeeks.org/c-programming-language" },
        { title: "HackerRank — C Practice Track", url: "https://hackerrank.com/domains/c" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly Programs & Viva)", weightage: 60 },
      { component: "End-Semester Lab Examination", weightage: 40 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Basic Electronics Lab": {
    code: "25B17EC171",
    title: "Basic Electronics Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 1,
    branch: "All B.Tech Branches",
    prerequisites: ["Senior Secondary Physics"],
    objectives: [
      "Operate laboratory instruments: Cathode Ray Oscilloscope (CRO), Digital Multimeter (DMM), and Function Generator.",
      "Verify P-N junction diode, Zener diode, and rectifier circuit characteristics.",
      "Analyze input and output characteristics of BJT in common emitter configuration.",
      "Construct inverting, non-inverting, and summing amplifier circuits using Op-Amp 741.",
      "Verify the truth tables of digital logic gates and implement basic Boolean functions.",
    ],
    units: [
      { number: 1, title: "Diode Circuits & Power Supplies", hours: 6, topics: [
        { name: "Semiconductor Diode V-I Curve", subtopics: ["Forward and reverse bias curves of Si and Ge diodes", "Knee voltage measurement"] },
        { name: "Zener Diode & Rectifiers", subtopics: ["Zener diode as voltage regulator", "Half-wave and full-wave bridge rectifier with capacitor filter"] },
      ]},
      { number: 2, title: "Transistors & Operational Amplifiers", hours: 8, topics: [
        { name: "Bipolar Junction Transistor", subtopics: ["Input and output characteristics of CE BJT", "Current gain calculation"] },
        { name: "Operational Amplifier (IC 741)", subtopics: ["Inverting and non-inverting amplifier", "Summing amplifier and voltage follower"] },
      ]},
      { number: 3, title: "Digital Logic Fundamentals", hours: 6, topics: [
        { name: "Logic Gates", subtopics: ["Truth tables of AND, OR, NOT, NAND, NOR, XOR, XNOR", "Implementation using universal NAND gates"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Use CRO, DMM, and signal generators safely to measure frequency, amplitude, and voltage." },
      { id: "CO2", description: "Construct rectifier and filter circuits for DC power conversion." },
      { id: "CO3", description: "Characterize transistor and operational amplifier circuits for signal amplification." },
      { id: "CO4", description: "Design combinational digital logic circuits using standard IC gates." },
      { id: "CO5", description: "Analyze experimental circuits and debug breadboard wiring connections." },
    ],
    books: {
      textbooks: [
        { author: "Dept. of ECE, JUIT", title: "Basic Electronics Lab Manual", edition: "2025-26", publisher: "JUIT Waknaghat" },
        { author: "Robert L. Boylestad, Louis Nashelsky", title: "Electronic Devices and Circuit Theory", edition: "11th", publisher: "Pearson" },
      ],
      references: [
        { author: "Albert Malvino, David J. Bates", title: "Electronic Principles", edition: "8th", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "All About Circuits — Electronics Tutorials", url: "https://allaboutcircuits.com" },
        { title: "Virtual Labs — Electronics & Communication", url: "https://vlab.co.in" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Breadboard setups & Viva)", weightage: 60 },
      { component: "End-Semester Lab Examination", weightage: 40 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of ECE" },
  },

  "Workshop": {
    code: "25B17GE171",
    title: "Engineering Workshop Practice",
    credits: { L: 0, T: 0, P: 3 },
    semester: 1,
    branch: "All B.Tech Branches",
    prerequisites: [],
    objectives: [
      "Acquire practical manufacturing skills in carpentry, fitting, welding, and electrical wiring.",
      "Understand workshop safety regulations, tool ergonomics, and material handling.",
      "Fabricate electronic PCBs using soldering, desoldering, and etching techniques.",
      "Assemble, disassemble, and diagnose computer hardware and peripheral connections.",
    ],
    units: [
      { number: 1, title: "Mechanical Trades", hours: 10, topics: [
        { name: "Carpentry Shop", subtopics: ["Timber types, sawing, planing, chisel work", "Making Mortise & Tenon and Lap joints"] },
        { name: "Fitting Shop", subtopics: ["Filing, chipping, scraping, hacksawing", "V-fitting and stepped fitting exercises"] },
        { name: "Welding Shop", subtopics: ["Arc welding, safety gear, electrode types", "Making Butt and Lap welded joints"] },
      ]},
      { number: 2, title: "Electrical & Electronics Fabrication", hours: 10, topics: [
        { name: "House Wiring", subtopics: ["Staircase wiring, two-way switches, earthing, fuse and MCB connections"] },
        { name: "PCB Fabrication & Soldering", subtopics: ["Component mounting on breadboards, soldering practice, desoldering wick"] },
      ]},
      { number: 3, title: "Computer Hardware & IT Skills", hours: 8, topics: [
        { name: "PC Hardware Assembly", subtopics: ["Motherboard, CPU, RAM, SMPS, SSD installation, BIOS configuration"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Use common hand tools and machine tools safely adhering to workshop protocols." },
      { id: "CO2", description: "Fabricate carpentry and fitting wooden/metal components to specified tolerances." },
      { id: "CO3", description: "Construct domestic electrical circuits and solder electronic components on circuit boards." },
      { id: "CO4", description: "Diagnose hardware issues and assemble standard desktop PC systems." },
      { id: "CO5", description: "Work safely in a technical manufacturing environment as an effective team member." },
    ],
    books: {
      textbooks: [
        { author: "H.S. Bawa", title: "Workshop Practice", edition: "2nd", publisher: "McGraw-Hill" },
        { author: "K. Venkat Reddy", title: "Workshop Practice Manual", edition: "1st", publisher: "BS Publications" },
      ],
      references: [
        { author: "S.K. Hajra Choudhury", title: "Elements of Workshop Technology (Vol 1 & 2)", edition: "14th", publisher: "Media Promoters" },
      ],
      online: [
        { title: "NPTEL: Manufacturing Process Technology", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Daily Job Work & Quality of Finish", weightage: 60 },
      { component: "End-Semester Practical & Viva", weightage: 40 },
    ],
    meta: { category: "ESC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Civil / Mechanical Workshop" },
  },

  // ─── SEMESTER 2 LABS & COURSES ─────────────────────────────────────────────

  "Physics Lab-II": {
    code: "25B17PH172",
    title: "Engineering Physics Laboratory - II",
    credits: { L: 0, T: 0, P: 2 },
    semester: 2,
    branch: "All B.Tech Branches",
    prerequisites: ["Physics Lab-I"],
    objectives: [
      "Experiment with solid-state, dielectric, and magnetic material properties.",
      "Analyze magnetic hysteresis loop (B-H curve) parameters.",
      "Measure solar cell conversion efficiency and fill factor.",
      "Determine velocity of ultrasonic waves in liquid media using an interferometer.",
    ],
    units: [
      { number: 1, title: "Solid State & Magnetism", hours: 8, topics: [
        { name: "Hysteresis Loop Tracer", subtopics: ["B-H curve analysis of ferromagnetic core", "Coercivity, retentivity, and hysteresis energy loss"] },
        { name: "Four-Probe Method", subtopics: ["Resistivity vs temperature measurement", "Band gap calculation of Germanium crystal"] },
      ]},
      { number: 2, title: "Optoelectronics & Ultrasonics", hours: 8, topics: [
        { name: "Solar Cell Characteristics", subtopics: ["I-V curves under illumination", "Short-circuit current, open-circuit voltage, fill factor, efficiency"] },
        { name: "Ultrasonic Interferometer", subtopics: ["Measurement of ultrasonic velocity in organic liquids", "Calculation of adiabatic compressibility"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Evaluate magnetic core materials using hysteresis loop tracing." },
      { id: "CO2", description: "Measure semiconductor resistivity and bandgap variation with temperature." },
      { id: "CO3", description: "Determine solar photovoltaic cell efficiency and power characteristics." },
      { id: "CO4", description: "Compute ultrasonic wave propagation speeds in liquid media." },
    ],
    books: {
      textbooks: [
        { author: "Dept. of Physics, JUIT", title: "Physics Laboratory Manual - II", edition: "2025-26", publisher: "JUIT Waknaghat" },
      ],
      references: [
        { author: "Charles Kittel", title: "Introduction to Solid State Physics", edition: "8th", publisher: "Wiley" },
      ],
      online: [
        { title: "Virtual Labs — Materials Physics", url: "https://vlab.co.in" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment", weightage: 60 },
      { component: "End-Semester Lab Examination", weightage: 40 },
    ],
    meta: { category: "BSC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of Physics & Materials Science" },
  },

  "Software Development Fundamentals Lab-II": {
    code: "25B17CI173",
    title: "Software Development Fundamentals Laboratory - II",
    credits: { L: 0, T: 0, P: 2 },
    semester: 2,
    branch: "CSE / IT",
    prerequisites: ["SDF Lab-I"],
    objectives: [
      "Master Object-Oriented Programming principles using C++.",
      "Implement operator overloading, multiple inheritance, and dynamic polymorphism.",
      "Write generic templates and work with the C++ Standard Template Library (STL).",
      "Apply robust exception handling and object serialization using file streams.",
    ],
    units: [
      { number: 1, title: "Classes, Objects & Overloading", hours: 6, topics: [
        { name: "OOP Foundations", subtopics: ["Constructors (default, parameterized, copy)", "Destructors, this pointer, friend functions"] },
        { name: "Operator Overloading", subtopics: ["Overloading unary and binary operators: +, -, ==, <<, >>", "Complex number and Matrix classes"] },
      ]},
      { number: 2, title: "Inheritance & Polymorphism", hours: 8, topics: [
        { name: "Inheritance Models", subtopics: ["Single, multiple, multilevel, and hierarchical inheritance", "Virtual base classes (diamond problem)"] },
        { name: "Polymorphism", subtopics: ["Virtual functions", "Pure virtual functions and abstract base classes", "Runtime dynamic binding"] },
      ]},
      { number: 3, title: "Templates, STL & File Streams", hours: 8, topics: [
        { name: "Generic Programming", subtopics: ["Function templates, class templates with multiple parameters"] },
        { name: "C++ STL", subtopics: ["std::vector, std::list, std::stack, std::queue, std::map", "STL algorithms: sort, find, binary_search"] },
        { name: "Exception Handling & Streams", subtopics: ["try, catch, throw blocks", "Custom exception classes", "Binary file serialization with fstream"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design modular, reusable C++ classes applying encapsulation and abstraction." },
      { id: "CO2", description: "Implement operator overloading and runtime polymorphism with virtual tables." },
      { id: "CO3", description: "Leverage the C++ STL container and algorithm library for efficient problem solving." },
      { id: "CO4", description: "Build fault-tolerant applications using C++ structured exception handling." },
    ],
    books: {
      textbooks: [
        { author: "Bjarne Stroustrup", title: "The C++ Programming Language", edition: "4th", publisher: "Addison-Wesley" },
        { author: "Robert Lafore", title: "Object-Oriented Programming in C++", edition: "4th", publisher: "Sams Publishing" },
      ],
      references: [
        { author: "Scott Meyers", title: "Effective Modern C++", edition: "1st", publisher: "O'Reilly" },
      ],
      online: [
        { title: "cppreference.com — Complete C++ Standard Reference", url: "https://en.cppreference.com" },
        { title: "LearnCpp.com — Comprehensive Modern C++ Tutorials", url: "https://learncpp.com" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly Programs & Viva)", weightage: 60 },
      { component: "End-Semester Lab Examination", weightage: 40 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Life Skills & Professional Communication Lab": {
    code: "25B17HS171",
    title: "Life Skills & Professional Communication Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 2,
    branch: "All B.Tech Branches",
    prerequisites: ["English"],
    objectives: [
      "Hone interpersonal, group communication, and public speaking skills.",
      "Practice mock Group Discussions (GD) and technical HR personal interviews.",
      "Craft ATS-compliant resumes, LinkedIn profiles, and professional cover letters.",
      "Develop team leadership, conflict management, and workplace emotional intelligence.",
    ],
    units: [
      { number: 1, title: "Oral Communication & Public Speaking", hours: 6, topics: [
        { name: "Extempore & Speeches", subtopics: ["Overcoming stage fright", "Voice modulation, body language, and pacing"] },
        { name: "Professional Presentations", subtopics: ["Slide deck design, storytelling, handling audience Q&A"] },
      ]},
      { number: 2, title: "Group Discussions & Interviews", hours: 8, topics: [
        { name: "Group Discussion Dynamics", subtopics: ["Initiating, moderating, and summarizing GDs", "Constructive argumentation without aggression"] },
        { name: "Interview Readiness", subtopics: ["STAR method for behavioral questions", "Common HR interview questions and body posture"] },
      ]},
      { number: 3, title: "Career Documentation & Workplace Etiquette", hours: 6, topics: [
        { name: "Resume & Profile Building", subtopics: ["ATS-optimized technical resume crafting", "LinkedIn profile building and networking"] },
        { name: "Workplace Skills", subtopics: ["Email etiquette, meeting minutes, cross-cultural team collaboration"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Deliver persuasive, well-structured technical presentations to diverse audiences." },
      { id: "CO2", description: "Participate constructively and assertively in corporate group discussions." },
      { id: "CO3", description: "Perform confidently in behavioral and technical mock employment interviews." },
      { id: "CO4", description: "Draft high-impact professional resumes and cover letters." },
    ],
    books: {
      textbooks: [
        { author: "Meenakshi Raman, Sangeeta Sharma", title: "Technical Communication", edition: "3rd", publisher: "Oxford University Press" },
      ],
      references: [
        { author: "Barun K. Mitra", title: "Personality Development and Soft Skills", edition: "2nd", publisher: "Oxford University Press" },
      ],
      online: [
        { title: "Harvard Business Review — Communication Tips", url: "https://hbr.org" },
        { title: "Toastmasters International — Public Speaking Guides", url: "https://toastmasters.org" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (GDs, Speeches, Resume drafts)", weightage: 60 },
      { component: "End-Semester Viva & Mock Interview", weightage: 40 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  "Engineering Drawing & Design": {
    code: "25B17GE172",
    title: "Engineering Drawing & Computer Aided Design (CAD)",
    credits: { L: 0, T: 0, P: 3 },
    semester: 2,
    branch: "All B.Tech Branches",
    prerequisites: [],
    objectives: [
      "Understand the principles of engineering graphics, projection systems, and standard dimensioning.",
      "Construct orthographic projections of points, lines, planes, and solid shapes.",
      "Draw sectional views, developments of surfaces, and isometric projections.",
      "Use modern CAD software (AutoCAD) to draft standard engineering component drawings.",
    ],
    units: [
      { number: 1, title: "Orthographic Projections", hours: 10, topics: [
        { name: "Points, Lines & Planes", subtopics: ["First and third angle projections", "True length and true inclination of lines", "Projections of polygonal and circular planes"] },
        { name: "Solids", subtopics: ["Projections of prisms, pyramids, cylinders, and cones with axis inclined to reference planes"] },
      ]},
      { number: 2, title: "Section of Solids & Developments", hours: 10, topics: [
        { name: "Sectional Views", subtopics: ["Cutting planes parallel, perpendicular, or inclined to reference planes", "True shape of sections"] },
        { name: "Development of Surfaces", subtopics: ["Parallel-line and radial-line development of ducting, funnels, and containers"] },
      ]},
      { number: 3, title: "Isometric Projections & AutoCAD", hours: 8, topics: [
        { name: "Isometric Views", subtopics: ["Isometric scales, conversion of orthographic multi-views to isometric 3D drawing"] },
        { name: "2D Computer-Aided Drafting", subtopics: ["AutoCAD basic commands, layers, dimensioning, hatching, exporting engineering sheets"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply engineering drawing standards and geometric construction methods." },
      { id: "CO2", description: "Construct multi-view orthographic and sectional projections of engineering solids." },
      { id: "CO3", description: "Draw isometric views and surface developments of fabricated components." },
      { id: "CO4", description: "Produce professional 2D technical drawings using AutoCAD software." },
    ],
    books: {
      textbooks: [
        { author: "N.D. Bhatt", title: "Engineering Drawing", edition: "53rd", publisher: "Charotar Publishing House" },
      ],
      references: [
        { author: "K.L. Narayana, P. Kannaiah", title: "Textbook on Engineering Drawing", edition: "2nd", publisher: "SciTech" },
      ],
      online: [
        { title: "NPTEL: Engineering Graphics and Design", url: "https://nptel.ac.in" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Sheet Submissions & CAD prints)", weightage: 60 },
      { component: "End-Semester Practical Examination", weightage: 40 },
    ],
    meta: { category: "ESC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of Civil Engineering" },
  },

  // ─── SEMESTER 3 LABS & PRACTICALS ──────────────────────────────────────────

  "Data Structures Lab": {
    code: "25B17CI380",
    title: "Data Structures Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["SDF Lab-II"],
    objectives: [
      "Implement fundamental linear data structures: stacks, queues, and linked lists in C++.",
      "Construct non-linear tree structures including Binary Search Trees (BST), AVL trees, and heaps.",
      "Implement graph representations and traversal algorithms (BFS and DFS).",
      "Build hash tables with collision resolution strategies (chaining and open addressing).",
      "Benchmark the empirical runtime performance of sorting and searching algorithms.",
    ],
    units: [
      { number: 1, title: "Stacks, Queues & Linked Lists", hours: 8, topics: [
        { name: "Linear Structures", subtopics: ["Infix to postfix converter using stack", "Circular queue implementation with arrays", "Singly, doubly, and circular linked list operations"] },
      ]},
      { number: 2, title: "Trees & Priority Queues", hours: 8, topics: [
        { name: "Hierarchical Structures", subtopics: ["Binary Tree traversals (recursive & iterative)", "BST insertion, deletion, and predecessor/successor", "AVL tree rotation balance verification", "Max heap / Min heap implementation and Heap sort"] },
      ]},
      { number: 3, title: "Graphs & Hashing", hours: 8, topics: [
        { name: "Network Algorithms", subtopics: ["Graph adjacency list representation", "Breadth First Search (BFS) and Depth First Search (DFS)", "Dijkstra shortest path algorithm", "Hash table with polynomial hash code and quadratic probing"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Implement linear and non-linear data structures from scratch in C++." },
      { id: "CO2", description: "Design efficient algorithms for hierarchical tree structures and balanced trees." },
      { id: "CO3", description: "Implement graph algorithms to solve network connectivity and shortest path problems." },
      { id: "CO4", description: "Implement hashing algorithms for average O(1) constant-time data access." },
    ],
    books: {
      textbooks: [
        { author: "Mark Allen Weiss", title: "Data Structures and Algorithm Analysis in C++", edition: "4th", publisher: "Pearson" },
        { author: "Ellis Horowitz, Sartaj Sahni", title: "Fundamentals of Data Structures in C++", edition: "2nd", publisher: "Universities Press" },
      ],
      references: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
      ],
      online: [
        { title: "Visualgo.net — Interactive Data Structure Visualizer", url: "https://visualgo.net" },
        { title: "LeetCode — Data Structure Study Plan", url: "https://leetcode.com" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly coding & viva)", weightage: 60 },
      { component: "End-Semester Lab Examination", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "DBMS Lab": {
    code: "25B17CI373",
    title: "Database Management Systems Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["SDF Lab-I"],
    objectives: [
      "Design relational schemas and implement them using PostgreSQL / MySQL / Oracle.",
      "Write complex SQL statements featuring multi-table JOINs, subqueries, and aggregate grouping.",
      "Implement integrity constraints, database views, and automated triggers.",
      "Develop procedural extensions using PL/SQL: stored procedures, functions, and cursors.",
      "Connect a relational database to a Python/Java backend application to perform CRUD operations.",
    ],
    units: [
      { number: 1, title: "DDL, DML & Basic SQL", hours: 6, topics: [
        { name: "Schema Definition", subtopics: ["CREATE, ALTER, DROP, TRUNCATE with Primary/Foreign Keys, CHECK, UNIQUE constraints"] },
        { name: "Data Manipulation", subtopics: ["INSERT, UPDATE, DELETE statements, pattern matching with LIKE, ORDER BY"] },
      ]},
      { number: 2, title: "Advanced SQL Queries", hours: 8, topics: [
        { name: "Joins & Aggregations", subtopics: ["INNER, LEFT, RIGHT, FULL OUTER joins, GROUP BY, HAVING clauses"] },
        { name: "Nested Subqueries", subtopics: ["Correlated subqueries, IN, EXISTS, ANY, ALL clauses", "Views creation and materialized views"] },
      ]},
      { number: 3, title: "PL/SQL & Application Integration", hours: 10, topics: [
        { name: "Procedural SQL", subtopics: ["PL/SQL blocks, implicit and explicit cursors, exception blocks", "Stored procedures and user-defined functions", "Row-level and statement-level triggers (audit logging)"] },
        { name: "Database Connectivity", subtopics: ["Connecting database to Python (psycopg2/SQLAlchemy) or Java (JDBC) to build a CRUD inventory/student management app"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design normalized relational schemas that enforce data integrity." },
      { id: "CO2", description: "Formulate complex SQL queries to extract multi-table relational data." },
      { id: "CO3", description: "Program automated business logic using PL/SQL stored procedures and triggers." },
      { id: "CO4", description: "Develop database-driven software applications with real-time backend persistence." },
    ],
    books: {
      textbooks: [
        { author: "Abraham Silberschatz, Henry F. Korth, S. Sudarshan", title: "Database System Concepts", edition: "7th", publisher: "McGraw-Hill" },
        { author: "Ivan Bayross", title: "SQL, PL/SQL: The Programming Language of Oracle", edition: "4th", publisher: "BPB" },
      ],
      references: [
        { author: "Ramez Elmasri, Shamkant B. Navathe", title: "Fundamentals of Database Systems", edition: "7th", publisher: "Pearson" },
      ],
      online: [
        { title: "PostgreSQL Official Documentation & Tutorials", url: "https://postgresql.org/docs" },
        { title: "SQLZoo — Interactive SQL Tutorial", url: "https://sqlzoo.net" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly queries & project)", weightage: 60 },
      { component: "End-Semester Lab Examination & Viva", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "UNIX Programming Lab": {
    code: "25B17CI375",
    title: "UNIX / Linux Systems Programming Laboratory",
    credits: { L: 0, T: 0, P: 4 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["SDF Lab-I"],
    objectives: [
      "Master the Linux command-line environment, filesystem navigation, and permissions.",
      "Write advanced Bash shell scripts for system automation and log analysis.",
      "Use regular expressions with stream editors (sed) and pattern processing tools (awk).",
      "Program Linux POSIX system calls for process management, IPC, and signals in C.",
    ],
    units: [
      { number: 1, title: "Linux Environment & Utilities", hours: 8, topics: [
        { name: "Command Line Mastery", subtopics: ["Filesystem navigation (ls, cd, find, grep, chmod, chown)", "I/O redirection, pipelines, background jobs, kill, top"] },
        { name: "Text Processing", subtopics: ["Regular expressions, stream editing with sed, column processing and reporting with awk"] },
      ]},
      { number: 2, title: "Shell Scripting", hours: 10, topics: [
        { name: "Bash Programming", subtopics: ["Variables, command substitutions, positional parameters", "Decision making: if-then-else, test brackets, case", "Loops: for, while, until, select", "Writing automated backup and system monitoring scripts"] },
      ]},
      { number: 3, title: "Linux System Calls in C", hours: 12, topics: [
        { name: "Process Management", subtopics: ["fork(), exec(), wait(), waitpid(), exit() system calls", "Orphan and zombie process demonstration"] },
        { name: "Inter-Process Communication", subtopics: ["Anonymous pipes, Named pipes (FIFOs), UNIX signals handling (kill, signal)"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Navigate and administer Linux server environments from the terminal." },
      { id: "CO2", description: "Automate administrative workflows using robust Bash scripts and regex tools." },
      { id: "CO3", description: "Process large system log files efficiently using sed and awk scripts." },
      { id: "CO4", description: "Develop systems software in C interacting directly with the Linux OS kernel via system calls." },
    ],
    books: {
      textbooks: [
        { author: "Sumitabha Das", title: "Unix Concepts and Applications", edition: "4th", publisher: "McGraw-Hill" },
        { author: "W. Richard Stevens, Stephen A. Rago", title: "Advanced Programming in the UNIX Environment", edition: "3rd", publisher: "Addison-Wesley" },
      ],
      references: [
        { author: "Evi Nemeth et al.", title: "UNIX and Linux System Administration Handbook", edition: "5th", publisher: "Addison-Wesley" },
      ],
      online: [
        { title: "Linux Man Pages Online", url: "https://man7.org/linux/man-pages" },
        { title: "The Linux Command Line by William Shotts", url: "https://linuxcommand.org" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly scripts & lab viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Competitive Programming-I": {
    code: "25B17CI379",
    title: "Competitive Programming - I",
    credits: { L: 0, T: 0, P: 2 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: ["Data Structures"],
    objectives: [
      "Master algorithmic speed, space-time trade-offs, and memory bounds in coding competitions.",
      "Solve competitive programming problems under strict time limits.",
      "Master two pointers, sliding window, prefix sums, and coordinate compression.",
      "Apply binary search on answer spaces and master bitwise manipulation tricks.",
    ],
    units: [
      { number: 1, title: "Complexity & Fast Techniques", hours: 6, topics: [
        { name: "Fast I/O & Math", subtopics: ["Fast I/O in C++, calculating operations per second, space complexity bounds"] },
        { name: "Prefix Sums & Two Pointers", subtopics: ["1D and 2D prefix sums, difference arrays, two pointers approach for target sums"] },
      ]},
      { number: 2, title: "Search & Bit Manipulation", hours: 8, topics: [
        { name: "Binary Search on Answer", subtopics: ["Monotonic condition checking, allocating books, aggressive cows problems"] },
        { name: "Bitwise Operators", subtopics: ["Bitmasking, subsets generation, XOR properties, counting set bits (builtin_popcount)"] },
      ]},
      { number: 3, title: "Contest Problem Solving", hours: 10, topics: [
        { name: "Online Contests", subtopics: ["Solving LeetCode Medium/Hard and Codeforces Div 3/2 problems under timed test conditions"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Analyze algorithmic time complexity and select optimal approaches within 1-second limits." },
      { id: "CO2", description: "Formulate binary search solutions for monotonic optimization problems." },
      { id: "CO3", description: "Implement bitwise operations and bitmask DP techniques." },
      { id: "CO4", description: "Achieve competitive ratings on platforms like Codeforces, LeetCode, and CodeChef." },
    ],
    books: {
      textbooks: [
        { author: "Antti Laaksonen", title: "Guide to Competitive Programming", edition: "2nd", publisher: "Springer" },
        { author: "Steven Halim, Felix Halim", title: "Competitive Programming 4", edition: "4th", publisher: "Lulu" },
      ],
      references: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
      ],
      online: [
        { title: "CP-Algorithms (e-maxx)", url: "https://cp-algorithms.com" },
        { title: "Codeforces Problemset", url: "https://codeforces.com/problemset" },
        { title: "USACO Guide", url: "https://usaco.guide" },
      ],
    },
    evaluation: [
      { component: "Contest Submissions & Problem-solving Benchmarks", weightage: 60 },
      { component: "End-Semester Timed Coding Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Summer Training-I (4 weeks)": {
    code: "25B19CI391",
    title: "Summer Training / Project - I",
    credits: { L: 0, T: 0, P: 0 },
    semester: 3,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Consolidate learning from 1st year through an industrial internship or mentored software project.",
      "Gain exposure to software engineering practices, version control (Git), and teamwork.",
      "Document technical implementation details in a formal technical project report.",
      "Defend project architecture, algorithms, and results before a departmental faculty committee.",
    ],
    units: [
      { number: 1, title: "Training Execution & Project Development", hours: 40, topics: [
        { name: "Industry / Academic Work", subtopics: ["4 weeks full-time training or project work during summer break after 2nd semester", "Git commit history and working prototype development"] },
      ]},
      { number: 2, title: "Documentation & Seminar Defense", hours: 10, topics: [
        { name: "Report & Viva", subtopics: ["Preparation of technical project report as per JUIT guidelines", "Presentation of work and viva-voce before departmental faculty panel"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply foundational computing knowledge to develop real-world software applications." },
      { id: "CO2", description: "Collaborate effectively in team settings using version control tools like GitHub." },
      { id: "CO3", description: "Author professional technical project documentation following academic guidelines." },
      { id: "CO4", description: "Deliver an oral technical defense answering faculty examination queries." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Academic Council", title: "Guidelines for Undergraduate Project & Training Evaluation", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [
        { title: "GitHub Guides & Collaboration Workflows", url: "https://docs.github.com" },
      ],
    },
    evaluation: [
      { component: "Training / Project Report Submission", weightage: 40 },
      { component: "Presentation & Oral Viva-Voce", weightage: 60 },
    ],
    meta: { category: "PRC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },


  // ─── SEMESTER 4 LABS, ELECTIVES & AUDIT ─────────────────────────────────────

  "Design and Analysis of Algorithms Lab": {
    code: "25B17CI471",
    title: "Design and Analysis of Algorithms Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Data Structures Lab"],
    objectives: [
      "Implement and empirically benchmark divide-and-conquer, greedy, and dynamic programming algorithms.",
      "Compare sorting algorithm performance on large randomized, sorted, and reverse-sorted datasets.",
      "Implement minimum spanning tree (MST) and single-source shortest path graph algorithms.",
      "Solve combinatorial constraint satisfaction problems using backtracking techniques.",
    ],
    units: [
      { number: 1, title: "Divide & Conquer and Greedy", hours: 8, topics: [
        { name: "Empirical Benchmarking", subtopics: ["Merge Sort vs Quick Sort with varying pivots", "Counting inversions", "Execution time vs input size plotting"] },
        { name: "Greedy Algorithms", subtopics: ["Fractional knapsack problem", "Huffman coding compression algorithm", "Prim's and Kruskal's MST using disjoint sets"] },
      ]},
      { number: 2, title: "Dynamic Programming", hours: 10, topics: [
        { name: "Classic DP Implementations", subtopics: ["0/1 Knapsack problem (recursive vs memoized vs bottom-up)", "Longest Common Subsequence (LCS)", "Matrix Chain Multiplication (MCM)", "Floyd-Warshall all-pairs shortest paths"] },
      ]},
      { number: 3, title: "Backtracking & Branch-and-Bound", hours: 8, topics: [
        { name: "Combinatorial Search", subtopics: ["N-Queens puzzle", "Graph m-coloring problem", "Subset sum problem", "Travelling Salesperson Problem (TSP) using branch and bound"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Implement fundamental algorithm design techniques in C++ and Python." },
      { id: "CO2", description: "Conduct empirical runtime measurements to validate asymptotic theoretical complexities." },
      { id: "CO3", description: "Design dynamic programming tables to solve optimal substructure problems." },
      { id: "CO4", description: "Implement backtracking algorithms for search and constraint-satisfaction problems." },
    ],
    books: {
      textbooks: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
      ],
      references: [
        { author: "Jon Kleinberg, Eva Tardos", title: "Algorithm Design", edition: "1st", publisher: "Pearson" },
      ],
      online: [
        { title: "GeeksforGeeks — Algorithm Lab Practice", url: "https://geeksforgeeks.org/fundamentals-of-algorithms" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly implementations & viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "AI & ML Lab": {
    code: "25B17CI472",
    title: "Artificial Intelligence and Machine Learning Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Math Foundations for AI", "Data Structures"],
    objectives: [
      "Master Python data manipulation libraries: NumPy, Pandas, Matplotlib, and Seaborn.",
      "Implement classic AI search algorithms: A* and Minimax with Alpha-Beta pruning.",
      "Train, evaluate, and tune supervised ML models using Scikit-Learn (Regression, Trees, SVM).",
      "Apply unsupervised clustering (K-Means) and build basic neural networks with PyTorch.",
    ],
    units: [
      { number: 1, title: "Data Wrangling & Search Algorithms", hours: 8, topics: [
        { name: "Python for Data Science", subtopics: ["NumPy vector operations", "Pandas DataFrame transformations, missing value handling, feature scaling"] },
        { name: "AI Search", subtopics: ["8-Puzzle solver using A* heuristic search", "Tic-Tac-Toe AI using Minimax with Alpha-Beta pruning"] },
      ]},
      { number: 2, title: "Supervised Learning", hours: 10, topics: [
        { name: "Regression & Classification", subtopics: ["Linear and Polynomial Regression with gradient descent", "Logistic Regression for binary classification", "Decision Trees and Random Forest with hyperparameter grid search", "Support Vector Machines (SVM) with linear and RBF kernels"] },
      ]},
      { number: 3, title: "Clustering & Neural Networks", hours: 8, topics: [
        { name: "Unsupervised Learning", subtopics: ["K-Means clustering with Elbow method on customer segmentation dataset", "PCA dimensionality reduction"] },
        { name: "Deep Learning Foundations", subtopics: ["Building a Multi-Layer Perceptron (MLP) in PyTorch for MNIST handwritten digit recognition"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Preprocess raw datasets, perform exploratory data analysis, and engineer features." },
      { id: "CO2", description: "Implement heuristic search algorithms for state-space AI problems." },
      { id: "CO3", description: "Train and evaluate supervised and unsupervised ML models assessing precision, recall, and ROC-AUC." },
      { id: "CO4", description: "Construct, train, and test feedforward neural networks using modern deep learning frameworks." },
    ],
    books: {
      textbooks: [
        { author: "Aurélien Géron", title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow", edition: "3rd", publisher: "O'Reilly" },
      ],
      references: [
        { author: "Sebastian Raschka, Vahid Mirjalili", title: "Python Machine Learning", edition: "3rd", publisher: "Packt" },
      ],
      online: [
        { title: "Scikit-learn Official Tutorials", url: "https://scikit-learn.org/stable/tutorial" },
        { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials" },
        { title: "Kaggle Learn — Machine Learning Tracks", url: "https://kaggle.com/learn" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Model scripts, Jupyter notebooks, viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Digital Systems & Computer Organisation Lab": {
    code: "25B17CI473",
    title: "Digital Systems and Computer Organisation Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Basic Electronics Lab"],
    objectives: [
      "Simulate combinational logic circuits: adders, subtractors, multiplexers, and decoders using Logisim.",
      "Design sequential modules: flip-flops, synchronous counters, and shift registers.",
      "Implement an Arithmetic Logic Unit (ALU) capable of arithmetic and logical operations.",
      "Simulate cache memory mapping and instruction pipelining behavior.",
    ],
    units: [
      { number: 1, title: "Combinational Circuit Design", hours: 8, topics: [
        { name: "Modular Arithmetic Circuits", subtopics: ["4-bit binary adder/subtractor with IC 7483", "Carry look-ahead adder design", "Multiplexer 8:1 and Decoder 3:8 implementation"] },
      ]},
      { number: 2, title: "Sequential Circuits & Registers", hours: 8, topics: [
        { name: "Clocked Logic", subtopics: ["Master-slave J-K flip-flop verification", "4-bit synchronous binary up/down counter", "Universal shift register with parallel load"] },
      ]},
      { number: 3, title: "ALU & Architecture Simulation", hours: 10, topics: [
        { name: "Processor Components", subtopics: ["8-function ALU design supporting ADD, SUB, AND, OR, XOR, NOT, shift", "Cache memory direct-mapped vs 2-way set associative hit/miss simulator", "Pipelined datapath hazard demonstration"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design, simulate, and verify combinational and sequential digital systems." },
      { id: "CO2", description: "Construct multi-functional ALU architectures handling integer operations." },
      { id: "CO3", description: "Analyze cache memory mapping techniques and compute memory access performance." },
      { id: "CO4", description: "Demonstrate instruction fetch, decode, and execute cycles in simulated processors." },
    ],
    books: {
      textbooks: [
        { author: "M. Morris Mano", title: "Computer System Architecture", edition: "3rd", publisher: "Pearson" },
        { author: "Carl Hamacher et al.", title: "Computer Organization and Embedded Systems", edition: "6th", publisher: "McGraw-Hill" },
      ],
      references: [],
      online: [
        { title: "Logisim Evolution Simulator", url: "https://github.com/logisim-evolution/logisim-evolution" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Logisim simulations & viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Competitive Programming-II": {
    code: "25B17CI474",
    title: "Competitive Programming - II",
    credits: { L: 0, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["Competitive Programming-I", "DAA"],
    objectives: [
      "Advance problem-solving speed on trees, graphs, and dynamic programming.",
      "Implement Disjoint Set Union (DSU) with path compression and union by rank.",
      "Solve shortest path variants and cycle detection in directed graphs.",
      "Master modular arithmetic, prime factorizations, and Euler's totient function for contests.",
    ],
    units: [
      { number: 1, title: "Graph Algorithms & DSU", hours: 8, topics: [
        { name: "Advanced Disjoint Sets", subtopics: ["DSU with path compression and rank", "Kruskal with DSU", "Bipartite graph coloring and cycle detection"] },
        { name: "Shortest Paths", subtopics: ["0-1 BFS, Dijkstra with priority queue, Bellman-Ford negative cycle detection"] },
      ]},
      { number: 2, title: "Dynamic Programming on Trees & Grids", hours: 10, topics: [
        { name: "Tree Algorithms", subtopics: ["Diameter of a tree, tree centroid, tree DP (maximum independent set on tree)"] },
        { name: "Grid DP", subtopics: ["Matrix exponentiation for fast linear recurrences, digit DP basics"] },
      ]},
      { number: 3, title: "Number Theory for Contests", hours: 8, topics: [
        { name: "Math & Modular Arithmetic", subtopics: ["Sieve of Eratosthenes, Segmented Sieve, Fermat's Little Theorem, Modular inverse, Fast exponentiation O(log N)"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Solve graph and connected component problems using DSU." },
      { id: "CO2", description: "Formulate DP on trees and grids under strict contest time limits." },
      { id: "CO3", description: "Apply number-theoretic theorems to compute large modular operations." },
      { id: "CO4", description: "Perform strongly in ACM-ICPC preliminary rounds and platform contests." },
    ],
    books: {
      textbooks: [
        { author: "Antti Laaksonen", title: "Guide to Competitive Programming", edition: "2nd", publisher: "Springer" },
      ],
      references: [
        { author: "Steven Halim", title: "Competitive Programming 4", edition: "4th", publisher: "Lulu" },
      ],
      online: [
        { title: "CP-Algorithms — Extensive Reference", url: "https://cp-algorithms.com" },
        { title: "CSES Problem Set — Algorithm Track", url: "https://cses.fi/problemset" },
      ],
    },
    evaluation: [
      { component: "Contest Problem Benchmarks", weightage: 60 },
      { component: "End-Semester Timed Coding Exam", weightage: 40 },
    ],
    meta: { category: "PEC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 1 (+ Lab)": {
    code: "25B14CI41X",
    title: "Discipline Elective - 1 (Front-End / UI-UX / Cyber Security)",
    credits: { L: 2, T: 0, P: 2 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: ["SDF-II"],
    objectives: [
      "Provide specialized foundation in one chosen professional track.",
      "Track A (Front-End): Master modern HTML5 semantic markup, CSS Flexbox/Grid, and responsive JavaScript ES6+.",
      "Track B (UI-UX): Understand user-centered design, persona creation, wireframing, and Figma prototyping.",
      "Track C (Cyber Security): Learn CIA triad, threat modeling, network attacks, and defensive ethical hacking tools.",
    ],
    units: [
      { number: 1, title: "Core Concepts of Chosen Track", hours: 10, topics: [
        { name: "Foundational Principles", subtopics: ["Front-End: Semantic HTML5, CSS layout models, DOM tree manipulation", "UI-UX: Design thinking, visual hierarchy, typography, accessibility WCAG", "Cyber: Threat landscape, vulnerabilities, OWASP principles"] },
      ]},
      { number: 2, title: "Modern Frameworks & Methodologies", hours: 10, topics: [
        { name: "Applied Practice", subtopics: ["Front-End: Modern JavaScript async/await, Fetch API, component-driven development", "UI-UX: Interactive Figma prototyping, usability testing, design systems", "Cyber: Network scanning with Nmap, Wireshark packet capture, basic cryptography"] },
      ]},
      { number: 3, title: "Elective Mini-Project", hours: 12, topics: [
        { name: "Capstone Delivery", subtopics: ["Hands-on lab project: Deploying a responsive landing page / High-fidelity interactive mobile prototype / Security audit report of a web application"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate working proficiency in the selected specialized engineering discipline." },
      { id: "CO2", description: "Apply industry-standard tools (Figma, VS Code, Nmap, DevTools) to execute domain tasks." },
      { id: "CO3", description: "Develop an end-to-end practical project aligning with industry standards." },
    ],
    books: {
      textbooks: [
        { author: "Jon Duckett", title: "HTML and CSS: Design and Build Websites", edition: "1st", publisher: "Wiley" },
        { author: "Don Norman", title: "The Design of Everyday Things", edition: "Revised", publisher: "Basic Books" },
      ],
      references: [
        { author: "William Stallings", title: "Network Security Essentials", edition: "6th", publisher: "Pearson" },
      ],
      online: [
        { title: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { title: "Figma Learn — Design Essentials", url: "https://help.figma.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 25 },
      { component: "End Semester Exam", weightage: 35 },
      { component: "Lab Practical & Mini-Project", weightage: 40 },
    ],
    meta: { category: "PEC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "HSS Elective - 1": {
    code: "25B14HS41X",
    title: "Humanities & Social Sciences Elective - 1",
    credits: { L: 3, T: 0, P: 0 },
    semester: 4,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Broaden student perspectives through sociological, psychological, or ethical dimensions.",
      "Understand the impact of technological disruption on modern labor and social systems.",
      "Analyze cognitive decision-making processes and organizational communication models.",
      "Apply ethical reasoning to dilemmas in software engineering and artificial intelligence.",
    ],
    units: [
      { number: 1, title: "Social and Behavioral Foundations", hours: 12, topics: [
        { name: "Sociological Perspective", subtopics: ["Technology and society, division of labor, industrial revolutions 1.0 to 4.0"] },
        { name: "Cognitive Basics", subtopics: ["Perception, attention, memory, motivation, stress management in tech workplaces"] },
      ]},
      { number: 2, title: "Workplace Dynamics & Ethics", hours: 14, topics: [
        { name: "Professional Ethics", subtopics: ["Engineering codes of ethics (IEEE/ACM), whistleblower protection, intellectual property fairness"] },
        { name: "Tech Impact", subtopics: ["Data privacy, surveillance capitalism, algorithmic bias, AI safety considerations"] },
      ]},
      { number: 3, title: "Case Studies & Seminars", hours: 14, topics: [
        { name: "Contemporary Issues", subtopics: ["Analysis of real-world corporate ethical failures (Therac-25, Volkswagen emissions, social media privacy breaches)"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Evaluate the social, organizational, and behavioral impacts of engineering innovations." },
      { id: "CO2", description: "Apply ethical codes and decision frameworks to complex technology scenarios." },
      { id: "CO3", description: "Communicate critically through written essays and class debates on societal challenges." },
    ],
    books: {
      textbooks: [
        { author: "Mike W. Martin, Roland Schinzinger", title: "Ethics in Engineering", edition: "4th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "C.N. Shankar Rao", title: "Sociology: Principles of Sociology with an Introduction to Social Thought", edition: "7th", publisher: "S. Chand" },
      ],
      online: [
        { title: "ACM Code of Ethics and Professional Conduct", url: "https://acm.org/code-of-ethics" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Assignments & Term Paper", weightage: 20 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  "Environmental Studies": {
    code: "25B11GE411",
    title: "Environmental Studies & Sustainable Development",
    credits: { L: 2, T: 0, P: 0 },
    semester: 4,
    branch: "All B.Tech Branches",
    prerequisites: [],
    objectives: [
      "Understand ecological concepts, ecosystems, biodiversity hotspots, and energy flow.",
      "Analyze causes and mitigation methods for air, water, soil, noise, and e-waste pollution.",
      "Examine climate change, global warming, sustainable green computing, and environmental laws.",
      "Foster ecological consciousness and sustainable lifestyle practices.",
    ],
    units: [
      { number: 1, title: "Ecosystems & Biodiversity", hours: 8, topics: [
        { name: "Ecology Fundamentals", subtopics: ["Structure of ecosystems: food chains, food webs, ecological pyramids, biogeochemical cycles"] },
        { name: "Biodiversity", subtopics: ["Genetic, species, and ecosystem diversity, biodiversity hotspots in India, in-situ and ex-situ conservation"] },
      ]},
      { number: 2, title: "Pollution & Environmental Disasters", hours: 10, topics: [
        { name: "Pollution Controls", subtopics: ["Air pollution (AQI), water pollution, solid waste management, electronic waste (e-waste) disposal in IT"] },
        { name: "Climate Challenges", subtopics: ["Greenhouse effect, global warming, carbon footprint of data centers, acid rain, ozone depletion"] },
      ]},
      { number: 3, title: "Environmental Policy & Field Study", hours: 8, topics: [
        { name: "Environmental Law", subtopics: ["The Environment (Protection) Act, Air Act, Water Act, role of Green Tribunals"] },
        { name: "Field Assignment", subtopics: ["Documentation of local ecological ecosystem in Waknaghat / Solan region"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Explain ecosystem functions, resource depletion, and biodiversity preservation strategies." },
      { id: "CO2", description: "Propose actionable solutions for industrial pollution, e-waste, and energy efficiency." },
      { id: "CO3", description: "Demonstrate awareness of Indian environmental legislation and global climate treaties." },
    ],
    books: {
      textbooks: [
        { author: "Erach Bharucha", title: "Textbook of Environmental Studies for Undergraduate Courses", edition: "3rd", publisher: "Universities Press" },
      ],
      references: [
        { author: "Anubha Kaushik, C.P. Kaushik", title: "Perspectives in Environmental Studies", edition: "6th", publisher: "New Age" },
      ],
      online: [
        { title: "UNEP — United Nations Environment Programme", url: "https://unep.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Field Project Report", weightage: 20 },
    ],
    meta: { category: "OMC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Civil Engineering" },
  },

  // ─── SEMESTER 5 LABS, ELECTIVES & APTITUDE ──────────────────────────────────

  "Operating Systems Lab": {
    code: "25B17CI572",
    title: "Operating Systems Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["UNIX Programming Lab"],
    objectives: [
      "Implement and simulate process scheduling algorithms: FCFS, SJF, Priority, and Round Robin.",
      "Solve concurrency and synchronization problems using POSIX semaphores and mutexes.",
      "Implement deadlock avoidance algorithms including the Banker's algorithm.",
      "Simulate memory page replacement policies: FIFO, LRU, and Optimal.",
    ],
    units: [
      { number: 1, title: "Process Scheduling Algorithms", hours: 8, topics: [
        { name: "CPU Schedulers", subtopics: ["FCFS, Non-preemptive and Preemptive SJF", "Round Robin with dynamic time quantum, Priority scheduling with aging", "Calculating average turnaround time and waiting time"] },
      ]},
      { number: 2, title: "Concurrency & Deadlocks", hours: 10, topics: [
        { name: "Synchronization", subtopics: ["Producer-Consumer bounded buffer problem using semaphores", "Dining Philosophers problem avoiding starvation", "Readers-Writers problem with mutex locks"] },
        { name: "Deadlock Avoidance", subtopics: ["Banker's Algorithm: Safety state detection and resource-request algorithm"] },
      ]},
      { number: 3, title: "Memory & Storage Simulation", hours: 8, topics: [
        { name: "Virtual Memory", subtopics: ["Page replacement algorithms: FIFO, LRU, Optimal page replacement, Belady's anomaly simulation"] },
        { name: "Disk Scheduling", subtopics: ["FCFS, SSTF, SCAN, C-SCAN disk arm head movement calculation"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Simulate and benchmark CPU scheduling algorithms for responsiveness and throughput." },
      { id: "CO2", description: "Develop race-condition-free multi-threaded programs using POSIX synchronization primitives." },
      { id: "CO3", description: "Implement deadlock avoidance and detection logic for multi-resource operating systems." },
      { id: "CO4", description: "Evaluate page replacement policies to minimize page fault rates." },
    ],
    books: {
      textbooks: [
        { author: "Abraham Silberschatz, Peter Baer Galvin, Greg Gagne", title: "Operating System Concepts", edition: "10th", publisher: "Wiley" },
      ],
      references: [
        { author: "Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-Dusseau", title: "Operating Systems: Three Easy Pieces (OSTEP)", edition: "1.0", publisher: "Arpaci-Dusseau Books" },
      ],
      online: [
        { title: "OSTEP Online Free Book Chapters", url: "https://pages.cs.wisc.edu/~remzi/OSTEP" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly algorithms & viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Computer Networks Lab": {
    code: "25B17CI573",
    title: "Computer Networks Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Computer Networks (Theory)"],
    objectives: [
      "Master network socket programming in C and Python for client-server architectures.",
      "Analyze packet headers and protocol handshakes using Wireshark network protocol analyzer.",
      "Design and configure switched and routed networks using Cisco Packet Tracer.",
      "Simulate routing protocols: Distance Vector (Bellman-Ford) and Link State (Dijkstra).",
    ],
    units: [
      { number: 1, title: "Socket Programming", hours: 8, topics: [
        { name: "Transport Layer Sockets", subtopics: ["TCP iterative and concurrent echo server", "UDP client-server communication", "Multi-client chat room application using select() and threads in Python"] },
      ]},
      { number: 2, title: "Packet Sniffing with Wireshark", hours: 8, topics: [
        { name: "Traffic Analysis", subtopics: ["Wireshark capture filters and display filters", "Analysis of Ethernet frame, IP packet header, TCP 3-way handshake and FIN teardown", "Inspecting DNS lookups, HTTP GET/POST headers, and TLS encrypted handshakes"] },
      ]},
      { number: 3, title: "Cisco Packet Tracer Network Design", hours: 10, topics: [
        { name: "Network Infrastructure", subtopics: ["IPv4 subnetting (FLSM and VLSM)", "Configuring switches, VLANs, and Trunking (802.1Q)", "Static routing and dynamic routing (RIPv2, OSPF single-area) configuration"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Write client-server network socket software in Python and C." },
      { id: "CO2", description: "Diagnose network bottlenecks, packet loss, and protocol anomalies using Wireshark." },
      { id: "CO3", description: "Design, subnet, and configure routed IP networks in simulated enterprise environments." },
      { id: "CO4", description: "Implement routing and error-correction algorithms in software." },
    ],
    books: {
      textbooks: [
        { author: "James F. Kurose, Keith W. Ross", title: "Computer Networking: A Top-Down Approach", edition: "8th", publisher: "Pearson" },
        { author: "Andrew S. Tanenbaum, David J. Wetherall", title: "Computer Networks", edition: "6th", publisher: "Pearson" },
      ],
      references: [],
      online: [
        { title: "Wireshark User's Guide", url: "https://wireshark.org/docs" },
        { title: "Cisco Networking Academy — Packet Tracer Tutorial", url: "https://netacad.com" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Socket code & Packet Tracer topologies)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Full Stack Development Lab": {
    code: "25B17CI571",
    title: "Full Stack Web Development Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["SDF Lab-II"],
    objectives: [
      "Develop production-ready web applications using modern JavaScript/TypeScript stacks.",
      "Build modular reactive user interfaces using React / Next.js with Tailwind CSS.",
      "Develop RESTful and GraphQL backend microservices using Node.js and Express.",
      "Integrate relational (PostgreSQL) and document (MongoDB) databases with ORMs (Prisma).",
      "Implement JWT authentication, role-based access control, and deploy via Vercel and Docker.",
    ],
    units: [
      { number: 1, title: "Modern Frontend Engineering", hours: 8, topics: [
        { name: "React & Next.js", subtopics: ["Component architecture, hooks (useState, useEffect, useMemo, custom hooks)", "Server components vs client components in Next.js App Router", "State management with Zustand / Redux Toolkit, styling with Tailwind CSS"] },
      ]},
      { number: 2, title: "Backend API Engineering", hours: 10, topics: [
        { name: "Node.js & Express", subtopics: ["REST API route handlers, middleware architecture, input validation with Zod", "Authentication with JWT and secure HTTP-only cookies, password hashing with bcrypt", "Database modeling with Prisma ORM / Mongoose (schemas, relations, migrations)"] },
      ]},
      { number: 3, title: "Full-Stack Deployment & CI/CD", hours: 8, topics: [
        { name: "Production Deployment", subtopics: ["Full-stack CRUD application deployment on Vercel and Render", "Containerizing full-stack app with Docker and Docker Compose", "Setting up GitHub Actions CI workflow for automated linting and test runs"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Architect full-stack web applications with clear frontend and backend separation." },
      { id: "CO2", description: "Design secure RESTful backend APIs with token-based authentication." },
      { id: "CO3", description: "Manage database migrations and entity relationships using modern ORMs." },
      { id: "CO4", description: "Package and deploy web services on cloud hosting providers with automated CI/CD." },
    ],
    books: {
      textbooks: [
        { author: "Alex Banks, Eve Porcello", title: "Learning React: Modern Patterns for Developing React Apps", edition: "2nd", publisher: "O'Reilly" },
        { author: "Ethan Brown", title: "Web Development with Node and Express", edition: "2nd", publisher: "O'Reilly" },
      ],
      references: [],
      online: [
        { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
        { title: "React Documentation", url: "https://react.dev" },
        { title: "Prisma ORM Guides", url: "https://prisma.io/docs" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Sprints & Code Reviews)", weightage: 60 },
      { component: "End-Semester Capstone Project Demo & Viva", weightage: 40 },
    ],
    meta: { category: "PEC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Competitive Programming-III": {
    code: "25B17CI574",
    title: "Competitive Programming - III",
    credits: { L: 0, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Competitive Programming-II"],
    objectives: [
      "Master advanced competitive programming data structures and range query techniques.",
      "Implement Segment Trees with Lazy Propagation for range update/query in O(log N).",
      "Construct Fenwick Trees (Binary Indexed Trees) for dynamic prefix operations.",
      "Implement string algorithms (KMP, Z-algorithm, Rabin-Karp, Tries) and Tree DP.",
    ],
    units: [
      { number: 1, title: "Range Query Data Structures", hours: 10, topics: [
        { name: "Segment Trees", subtopics: ["Point update and range query, Lazy propagation for range updates", "Merge sort tree and dynamic segment tree"] },
        { name: "Binary Indexed Trees", subtopics: ["Fenwick Tree point update & range sum, 2D Fenwick tree"] },
      ]},
      { number: 2, title: "Advanced Trees & String Algorithms", hours: 8, topics: [
        { name: "Tree Algorithms", subtopics: ["Lowest Common Ancestor (LCA) using binary lifting O(log N)", "Heavy-Light Decomposition (HLD) overview"] },
        { name: "String Matching", subtopics: ["Prefix function and KMP algorithm, Z-algorithm, Trie data structure for prefix queries and XOR maximization"] },
      ]},
      { number: 3, title: "Advanced Contest Problem Solving", hours: 8, topics: [
        { name: "Contest Simulation", subtopics: ["Solving Codeforces Div 2 (C/D/E levels) and AtCoder Regular Contests (ARC) problems"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Implement Segment Trees and Fenwick Trees to solve range query challenges." },
      { id: "CO2", description: "Compute Lowest Common Ancestor using binary lifting on trees." },
      { id: "CO3", description: "Solve complex pattern matching and XOR queries using Tries and string algorithms." },
      { id: "CO4", description: "Achieve Candidate Master / Specialist ranking on global competitive platforms." },
    ],
    books: {
      textbooks: [
        { author: "Antti Laaksonen", title: "Guide to Competitive Programming", edition: "2nd", publisher: "Springer" },
      ],
      references: [
        { author: "Steven Halim", title: "Competitive Programming 4", edition: "4th", publisher: "Lulu" },
      ],
      online: [
        { title: "CP-Algorithms Segment Tree Guide", url: "https://cp-algorithms.com/data_structures/segment_tree.html" },
        { title: "AtCoder Educational DP Contest", url: "https://atcoder.jp" },
      ],
    },
    evaluation: [
      { component: "Contest Submissions & Problem-solving Benchmarks", weightage: 60 },
      { component: "End-Semester Timed Coding Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Logical and Quantitative Techniques-I": {
    code: "25B11HS511",
    title: "Logical and Quantitative Techniques - I (Campus Placement Training)",
    credits: { L: 2, T: 0, P: 0 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Prepare students for on-campus corporate recruitment aptitude screening tests.",
      "Master fundamental quantitative math techniques under strict time constraints.",
      "Solve logical reasoning puzzles, seating arrangements, and analytical syllogisms.",
      "Develop rapid mental math, speed calculation, and pattern recognition abilities.",
    ],
    units: [
      { number: 1, title: "Quantitative Aptitude Fundamentals", hours: 10, topics: [
        { name: "Numbers & Arithmetic", subtopics: ["Number system, divisibility rules, HCF & LCM, speed math shortcuts", "Percentages, Profit & Loss, Simple and Compound Interest", "Ratios, Proportions, Mixtures & Alligations, Averages"] },
      ]},
      { number: 2, title: "Time, Speed & Algebra", hours: 10, topics: [
        { name: "Kinematics & Work", subtopics: ["Time and Work, Pipes & Cisterns", "Time, Speed, Distance, Problems on Trains, Boats & Streams", "Permutations & Combinations, Probability essentials"] },
      ]},
      { number: 3, title: "Logical & Analytical Reasoning", hours: 10, topics: [
        { name: "Reasoning Tracks", subtopics: ["Blood relations, Direction sense, Seating arrangements (linear, circular)", "Coding-decoding, Series completion, Syllogisms, Clock and Calendar problems"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Solve quantitative aptitude problems within 60 seconds per question." },
      { id: "CO2", description: "Decipher analytical puzzles and deductive logic problems accurately." },
      { id: "CO3", description: "Score top percentiles in company aptitude tests (TCS, Infosys, Cognizant, Amazon, Capgemini)." },
    ],
    books: {
      textbooks: [
        { author: "R.S. Aggarwal", title: "Quantitative Aptitude for Competitive Examinations", edition: "Revised", publisher: "S. Chand" },
        { author: "R.S. Aggarwal", title: "A Modern Approach to Verbal & Non-Verbal Reasoning", edition: "Revised", publisher: "S. Chand" },
      ],
      references: [
        { author: "Arun Sharma", title: "How to Prepare for Quantitative Aptitude for CAT", edition: "9th", publisher: "McGraw-Hill" },
      ],
      online: [
        { title: "IndiaBIX — Quantitative Aptitude Practice", url: "https://indiabix.com" },
      ],
    },
    evaluation: [
      { component: "Weekly Timed Aptitude Mock Quizzes", weightage: 50 },
      { component: "End-Semester Aptitude Assessment Exam", weightage: 50 },
    ],
    meta: { category: "HSC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  "Summer Training-II (6 weeks)": {
    code: "25B19CI591",
    title: "Summer Training / Industrial Internship - II",
    credits: { L: 0, T: 0, P: 0 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Complete a 6-week software engineering internship or research project after 4th semester.",
      "Work in corporate software teams with code repositories, sprint cycles, and issue trackers.",
      "Produce documented proof of internship completion, mentor certificate, and git commits.",
      "Present technical achievements and system architecture before a faculty evaluation panel.",
    ],
    units: [
      { number: 1, title: "Internship Execution", hours: 60, topics: [
        { name: "Industry Software Development", subtopics: ["6 weeks full-time internship in registered IT companies or funded research labs", "Deployment of features, bugs resolved, and code contributions"] },
      ]},
      { number: 2, title: "Report & Viva Defense", hours: 15, topics: [
        { name: "Formal Evaluation", subtopics: ["Technical report according to JUIT thesis template with system diagrams and results", "Oral presentation and viva-voce examination before departmental committee"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate applied competence in real-world corporate technology environments." },
      { id: "CO2", description: "Adhere to professional workplace deadlines, code reviews, and communication channels." },
      { id: "CO3", description: "Formulate technical project documentation detailing system architecture and results." },
      { id: "CO4", description: "Successfully defend technical methodologies in formal viva examinations." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Academic Council", title: "Guidelines for Industrial Training and Project Evaluation", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [],
    },
    evaluation: [
      { component: "Company Mentor Feedback & Attendance Report", weightage: 30 },
      { component: "Technical Internship Report Submission", weightage: 30 },
      { component: "Faculty Committee Presentation & Viva", weightage: 40 },
    ],
    meta: { category: "PRC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Indian Constitution & Traditional Knowledge": {
    code: "25B11HS512",
    title: "Indian Constitution & Traditional Knowledge Systems",
    credits: { L: 2, T: 0, P: 0 },
    semester: 5,
    branch: "All B.Tech Branches",
    prerequisites: [],
    objectives: [
      "Understand the historical background, philosophy, and basic structure of the Indian Constitution.",
      "Analyze Fundamental Rights, Directive Principles of State Policy, and Fundamental Duties.",
      "Understand the structure and powers of the Union and State Legislature, Executive, and Judiciary.",
      "Explore indigenous traditional knowledge systems in science, mathematics, architecture, and wellness.",
    ],
    units: [
      { number: 1, title: "Constitution Framework & Rights", hours: 8, topics: [
        { name: "Preamble & Basics", subtopics: ["Historical evolution, constituent assembly, basic structure doctrine"] },
        { name: "Fundamental Rights & Duties", subtopics: ["Articles 14-32, Right to Equality, Freedom, Constitutional Remedies, Fundamental Duties (Article 51A)"] },
      ]},
      { number: 2, title: "Government Machinery & Judiciary", hours: 8, topics: [
        { name: "Organs of State", subtopics: ["President, Prime Minister, Parliament, Supreme Court and High Courts, Judicial Review"] },
        { name: "Emergency Provisions", subtopics: ["National, State, and Financial emergencies, constitutional amendments"] },
      ]},
      { number: 3, title: "Indian Traditional Knowledge Systems", hours: 8, topics: [
        { name: "Heritage & Science", subtopics: ["Ancient Indian mathematics and astronomy (Aryabhata, Brahmagupta, Madhava)", "Traditional metallurgy, water harvesting, Ayurveda, and sustainable ecological ethics"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate working knowledge of citizen rights and constitutional governance." },
      { id: "CO2", description: "Analyze the roles and checks-and-balances among legislative, executive, and judicial bodies." },
      { id: "CO3", description: "Appreciate the scientific, mathematical, and environmental contributions of Indian heritage." },
    ],
    books: {
      textbooks: [
        { author: "M. Laxmikanth", title: "Indian Polity", edition: "7th", publisher: "McGraw-Hill" },
        { author: "Kapil Kapoor, Avadhesh Kumar Singh", title: "Indian Knowledge Systems (Vol 1 & 2)", edition: "1st", publisher: "DK Printworld" },
      ],
      references: [
        { author: "D.D. Basu", title: "Introduction to the Constitution of India", edition: "26th", publisher: "LexisNexis" },
      ],
      online: [
        { title: "Legislative Department, Ministry of Law and Justice, Govt. of India", url: "https://legislative.gov.in/constitution-of-india" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 70 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  "Discipline Elective - 2 (+ Lab)": {
    code: "25B14CI51X",
    title: "Discipline Elective - 2 (Cloud / Mobile / Cryptography)",
    credits: { L: 2, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Computer Networks", "Operating Systems"],
    objectives: [
      "Track A (Cloud Computing): Master virtualization, Docker, Kubernetes container orchestration, and AWS/GCP services.",
      "Track B (Mobile Development): Build native-performance Android/iOS applications with Flutter and Dart.",
      "Track C (Cryptography): Implement symmetric/asymmetric ciphers (AES, RSA, ECC), digital signatures, and firewalls.",
    ],
    units: [
      { number: 1, title: "Theoretical Foundations", hours: 10, topics: [
        { name: "Domain Architecture", subtopics: ["Cloud: Hypervisors, IaaS/PaaS/SaaS, Docker container lifecycle", "Mobile: Flutter widget tree, state management, asynchronous streams", "Crypto: Classical ciphers, DES, AES, modular mathematics, RSA algorithm"] },
      ]},
      { number: 2, title: "System Implementation", hours: 12, topics: [
        { name: "Hands-on Development", subtopics: ["Cloud: Kubernetes deployments, services, ingress, AWS EC2 & S3 automation", "Mobile: SQLite/Firebase integration, REST API consumption, device GPS/camera access", "Crypto: SHA-256 hashing, HMAC, SSL/TLS handshake, certificate management"] },
      ]},
      { number: 3, title: "Domain Project", hours: 10, topics: [
        { name: "Term Project", subtopics: ["End-to-end elective project: Deploying microservice cluster / Cross-platform mobile utility / Secure encrypted messaging protocol"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design scalable cloud, mobile, or cryptographic software systems." },
      { id: "CO2", description: "Deploy containerized or cross-platform services with real-time backends." },
      { id: "CO3", description: "Evaluate system security, latency, and operational scalability." },
    ],
    books: {
      textbooks: [
        { author: "Rajkumar Buyya et al.", title: "Mastering Cloud Computing", edition: "1st", publisher: "McGraw-Hill" },
        { author: "William Stallings", title: "Cryptography and Network Security", edition: "8th", publisher: "Pearson" },
      ],
      references: [],
      online: [
        { title: "Flutter Official Documentation", url: "https://docs.flutter.dev" },
        { title: "Kubernetes Documentation", url: "https://kubernetes.io/docs" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 25 },
      { component: "End Semester Exam", weightage: 35 },
      { component: "Lab Practical & Project", weightage: 40 },
    ],
    meta: { category: "PEC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 3 (+ Lab)": {
    code: "25B14CI52X",
    title: "Discipline Elective - 3 (Deep Learning / Data Mining / Compiler)",
    credits: { L: 2, T: 0, P: 2 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["AI & ML", "Theory of Computation"],
    objectives: [
      "Track A (Deep Learning): Master CNNs, RNNs, LSTMs, Transformers, and PyTorch deep neural modeling.",
      "Track B (Data Mining): Implement ETL pipelines, Apriori association mining, decision trees, and OLAP cubes.",
      "Track C (Compiler Design): Build lexical analyzers (Lex), parsers (Yacc), abstract syntax trees, and intermediate code generators.",
    ],
    units: [
      { number: 1, title: "Advanced Theoretical Principles", hours: 10, topics: [
        { name: "Domain Theory", subtopics: ["Deep Learning: Backpropagation mathematics, convolution kernels, attention mechanism", "Data Mining: Data cleaning, Apriori algorithm, FP-Growth, clustering validation", "Compiler: Lexical tokens, context-free grammars, LL(1) and LR(1) parser tables"] },
      ]},
      { number: 2, title: "Model & System Construction", hours: 12, topics: [
        { name: "Implementation", subtopics: ["Deep Learning: Building a Vision Transformer / ResNet in PyTorch on GPU", "Data Mining: Running association rule mining and dimensional reduction in Python", "Compiler: Writing Lex/Yacc specifications to compile a custom programming syntax"] },
      ]},
      { number: 3, title: "Lab Mini-Project", hours: 10, topics: [
        { name: "Deliverable", subtopics: ["Comprehensive lab demo: End-to-end classification system / Data analytics pipeline / Working prototype compiler"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Formulate advanced mathematical and algorithmic models in the specialized track." },
      { id: "CO2", description: "Develop and optimize deep neural networks, mining models, or compiler passes." },
      { id: "CO3", description: "Validate software performance against industry benchmarks." },
    ],
    books: {
      textbooks: [
        { author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville", title: "Deep Learning", edition: "1st", publisher: "MIT Press" },
        { author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman", title: "Compilers: Principles, Techniques, and Tools (Dragon Book)", edition: "2nd", publisher: "Pearson" },
      ],
      references: [
        { author: "Jiawei Han, Micheline Kamber, Jian Pei", title: "Data Mining: Concepts and Techniques", edition: "3rd", publisher: "Morgan Kaufmann" },
      ],
      online: [
        { title: "DeepLearning.AI — Deep Learning Specialization", url: "https://deeplearning.ai" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 25 },
      { component: "End Semester Exam", weightage: 35 },
      { component: "Lab Practical & Project", weightage: 40 },
    ],
    meta: { category: "PEC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Science Elective": {
    code: "25B14MA51X",
    title: "Applied Mathematics / Science Elective",
    credits: { L: 3, T: 0, P: 0 },
    semester: 5,
    branch: "CSE / IT",
    prerequisites: ["Mathematics-I", "Mathematics-II"],
    objectives: [
      "Apply numerical algorithms for root finding, numerical integration, and differential equations.",
      "Understand linear programming, the Simplex algorithm, duality, and transportation problems.",
      "Explore graph theory foundations: Euler/Hamiltonian paths, planar graphs, and network flow.",
    ],
    units: [
      { number: 1, title: "Numerical Methods & Root Finding", hours: 14, topics: [
        { name: "Computational Methods", subtopics: ["Newton-Raphson, Secant method, Gaussian elimination, LU decomposition, Runge-Kutta 4th order (RK4) ODE solver"] },
      ]},
      { number: 2, title: "Optimization & Linear Programming", hours: 14, topics: [
        { name: "Operations Research", subtopics: ["Formulating optimization problems, Graphical method, Simplex method, Big-M method, Dual Simplex, Transportation and Assignment problems"] },
      ]},
      { number: 3, title: "Graph Theory & Combinatorics", hours: 12, topics: [
        { name: "Discrete Structures", subtopics: ["Isomorphism, connectivity, Eulerian and Hamiltonian graphs, planar graphs (Euler's formula), vertex and edge coloring, Max-Flow Min-Cut theorem"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Solve non-linear equations and differential systems using numerical algorithms." },
      { id: "CO2", description: "Model operational industry problems and solve them using linear programming." },
      { id: "CO3", description: "Analyze structural and network properties using advanced graph theory." },
    ],
    books: {
      textbooks: [
        { author: "S.S. Sastry", title: "Introductory Methods of Numerical Analysis", edition: "5th", publisher: "PHI" },
        { author: "Hamdy A. Taha", title: "Operations Research: An Introduction", edition: "10th", publisher: "Pearson" },
      ],
      references: [
        { author: "Narsingh Deo", title: "Graph Theory with Applications to Engineering and Computer Science", edition: "1st", publisher: "PHI" },
      ],
      online: [
        { title: "MIT OpenCourseWare — Introduction to Operations Research", url: "https://ocw.mit.edu" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Quizzes & Problem Sets", weightage: 20 },
    ],
    meta: { category: "BSC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of Mathematics" },
  },

  // ─── SEMESTER 6 LABS, ELECTIVES & MINOR PROJECT ────────────────────────────

  "Web Technology Lab": {
    code: "25B17CI671",
    title: "Web Technology Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Web Technology (Theory)"],
    objectives: [
      "Build dynamic single-page web applications with React, TypeScript, and modern bundlers.",
      "Develop secure RESTful backend services with Express and connect to cloud databases.",
      "Implement real-time bidirectional communication using WebSockets (Socket.IO).",
      "Deploy full-stack web applications on cloud infrastructure with Docker and SSL.",
    ],
    units: [
      { number: 1, title: "Modern Web Front-End", hours: 8, topics: [
        { name: "TypeScript & React", subtopics: ["TypeScript types and interfaces, React state machines, custom hooks, Tailwind CSS design system"] },
      ]},
      { number: 2, title: "Real-time Back-End & WebSockets", hours: 10, topics: [
        { name: "Real-Time Services", subtopics: ["Socket.IO real-time multi-user chat and notification engine, JWT session verification, rate limiting middleware"] },
      ]},
      { number: 3, title: "Full-Stack Security & Deployment", hours: 8, topics: [
        { name: "Cloud Production", subtopics: ["Security audits: CSRF tokens, Helmet security headers, SQL injection prevention, Docker compose multi-container deployment"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Develop modern web applications using TypeScript, React, and Node.js." },
      { id: "CO2", description: "Construct real-time web applications with WebSocket communication." },
      { id: "CO3", description: "Secure web endpoints against common security vulnerabilities." },
      { id: "CO4", description: "Containerize and deploy production services to cloud environments." },
    ],
    books: {
      textbooks: [
        { author: "Nicholas C. Zakas", title: "Professional JavaScript for Web Developers", edition: "4th", publisher: "Wiley" },
      ],
      references: [],
      online: [
        { title: "Socket.IO Documentation", url: "https://socket.io/docs" },
        { title: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly modules & code reviews)", weightage: 60 },
      { component: "End-Semester Practical Exam & Viva", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Advanced DSA Lab": {
    code: "25B17CI672",
    title: "Advanced Data Structures and Algorithms Laboratory",
    credits: { L: 0, T: 0, P: 2 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Advanced DSA (Theory)"],
    objectives: [
      "Implement self-balancing search trees (Red-Black Trees, Splay Trees, B+ Trees) in C++.",
      "Implement advanced string pattern matching: Knuth-Morris-Pratt (KMP) and Suffix Arrays.",
      "Solve maximum network flow problems using Ford-Fulkerson and Edmonds-Karp algorithms.",
      "Implement computational geometry algorithms including Graham Scan Convex Hull.",
    ],
    units: [
      { number: 1, title: "Advanced Search Trees", hours: 10, topics: [
        { name: "Balanced Trees", subtopics: ["Red-Black tree node coloring, left and right rotations, insert fixup", "B+ Tree order-M node splitting and multi-level index search"] },
      ]},
      { number: 2, title: "String & Graph Algorithms", hours: 8, topics: [
        { name: "Advanced Algorithms", subtopics: ["KMP algorithm with Longest Prefix Suffix (LPS) array computation", "Ford-Fulkerson algorithm for Maximum Flow using residual graph and BFS"] },
      ]},
      { number: 3, title: "Geometry & Approximation", hours: 8, topics: [
        { name: "Specialized Problem Solving", subtopics: ["Graham Scan convex hull algorithm in O(N log N)", "Approximation algorithm for Vertex Cover and Metric TSP"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Implement complex self-balancing tree structures with rigorous invariant checking." },
      { id: "CO2", description: "Design linear-time string search and network flow solutions." },
      { id: "CO3", description: "Solve computational geometry and heuristic approximation problems." },
    ],
    books: {
      textbooks: [
        { author: "Thomas H. Cormen et al.", title: "Introduction to Algorithms (CLRS)", edition: "4th", publisher: "MIT Press" },
      ],
      references: [],
      online: [
        { title: "CP-Algorithms Advanced Topics", url: "https://cp-algorithms.com" },
      ],
    },
    evaluation: [
      { component: "Continuous Assessment (Weekly implementations & viva)", weightage: 60 },
      { component: "End-Semester Practical Exam", weightage: 40 },
    ],
    meta: { category: "PCC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 4": {
    code: "25B14CI61X",
    title: "Discipline Elective - 4 (NLP / Big Data / Computer Vision)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["AI & ML", "Math Foundations for AI"],
    objectives: [
      "Track A (NLP): Learn tokenization, TF-IDF, Word2Vec, BERT, and Transformer architecture.",
      "Track B (Big Data): Understand Hadoop ecosystem, HDFS, MapReduce, and Apache Spark streaming.",
      "Track C (Computer Vision): Apply convolution kernels, edge detection, YOLO object detection, and segmentation.",
    ],
    units: [
      { number: 1, title: "Domain Foundations", hours: 12, topics: [
        { name: "Core Principles", subtopics: ["NLP: Text preprocessing, N-gram language models, word embeddings", "Big Data: 5 V's of big data, HDFS architecture, MapReduce programming paradigm", "Vision: Image representations, spatial filtering, morphological operations, Haar cascades"] },
      ]},
      { number: 2, title: "Deep Architectures", hours: 14, topics: [
        { name: "Modern Networks", subtopics: ["NLP: Transformer self-attention, encoder-decoder, fine-tuning Hugging Face models", "Big Data: Apache Spark RDDs, DataFrames, Spark SQL, MLlib", "Vision: Convolutional neural networks (ResNet), object detection (YOLO, Faster R-CNN)"] },
      ]},
      { number: 3, title: "Industrial Applications", hours: 14, topics: [
        { name: "Real-world Systems", subtopics: ["NLP: Sentiment analysis, chatbots, question answering", "Big Data: Real-time Kafka log streaming, distributed query engines", "Vision: Facial recognition, autonomous vehicle perception, medical imaging analysis"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Formulate domain solutions using natural language, big data, or computer vision techniques." },
      { id: "CO2", description: "Train and tune state-of-the-art models using industry frameworks (Transformers, Spark, OpenCV)." },
      { id: "CO3", description: "Evaluate model accuracy, latency, and resource trade-offs on production datasets." },
    ],
    books: {
      textbooks: [
        { author: "Dan Jurafsky, James H. Martin", title: "Speech and Language Processing", edition: "3rd", publisher: "Pearson" },
        { author: "Richard Szeliski", title: "Computer Vision: Algorithms and Applications", edition: "2nd", publisher: "Springer" },
      ],
      references: [
        { author: "Tom White", title: "Hadoop: The Definitive Guide", edition: "4th", publisher: "O'Reilly" },
      ],
      online: [
        { title: "Hugging Face NLP Course", url: "https://huggingface.co/learn/nlp-course" },
        { title: "OpenCV Official Tutorials", url: "https://docs.opencv.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Project & Seminar", weightage: 20 },
    ],
    meta: { category: "PEC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 5": {
    code: "25B14CI62X",
    title: "Discipline Elective - 5 (DevOps / IoT / Blockchain)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Computer Networks", "Operating Systems"],
    objectives: [
      "Track A (DevOps): Learn CI/CD pipelines, Infrastructure as Code (Terraform), Docker, and Kubernetes.",
      "Track B (IoT): Program microcontrollers (ESP32/Raspberry Pi), MQTT protocols, and cloud sensor nodes.",
      "Track C (Blockchain): Master distributed ledgers, Ethereum Virtual Machine (EVM), Solidity smart contracts, and Web3.",
    ],
    units: [
      { number: 1, title: "System Fundamentals", hours: 12, topics: [
        { name: "Foundational Architectures", subtopics: ["DevOps: Cultural practices, version control workflows, automated testing, continuous delivery", "IoT: Embedded architecture, GPIO, sensors (temperature, ultrasonic), communication protocols (SPI, I2C, UART)", "Blockchain: Cryptographic hashing, Merkle trees, Proof-of-Work vs Proof-of-Stake, Bitcoin protocol"] },
      ]},
      { number: 2, title: "Frameworks & Implementation", hours: 14, topics: [
        { name: "Engineering Tools", subtopics: ["DevOps: GitHub Actions, Jenkins, Docker containerization, Kubernetes pods & services, Prometheus monitoring", "IoT: MQTT broker setup, HTTP REST APIs for IoT, cloud telemetry dashboards (ThingsBoard, AWS IoT)", "Blockchain: Solidity programming, smart contract deployment on testnets, Remix IDE, Metamask wallet integration"] },
      ]},
      { number: 3, title: "Security & Scaling", hours: 14, topics: [
        { name: "Enterprise Readiness", subtopics: ["DevOps: Zero-downtime rolling updates, canary deployments, secrets management (Vault)", "IoT: Edge computing, low-power WAN (LoRaWAN), IoT device security", "Blockchain: Smart contract reentrancy attacks, gas optimization, decentralized finance (DeFi) basics"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design automated DevOps release pipelines, IoT sensor meshes, or decentralized smart contracts." },
      { id: "CO2", description: "Deploy cloud-connected or on-chain software components using industry toolchains." },
      { id: "CO3", description: "Analyze performance, fault tolerance, and security vectors of distributed architectures." },
    ],
    books: {
      textbooks: [
        { author: "Gene Kim et al.", title: "The DevOps Handbook", edition: "2nd", publisher: "IT Revolution" },
        { author: "Andreas M. Antonopoulos, Gavin Wood", title: "Mastering Ethereum", edition: "1st", publisher: "O'Reilly" },
      ],
      references: [
        { author: "Arshdeep Bahga, Vijay Madisetti", title: "Internet of Things: A Hands-On Approach", edition: "1st", publisher: "Universities Press" },
      ],
      online: [
        { title: "Ethereum.org Developer Documentation", url: "https://ethereum.org/developers" },
        { title: "DevOps Roadmap", url: "https://roadmap.sh/devops" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Term Project & Assignments", weightage: 20 },
    ],
    meta: { category: "PEC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Open Elective - 1": {
    code: "25B14OE61X",
    title: "Open Elective - 1 (Interdisciplinary Course)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Broaden engineering horizons with courses from Biotechnology, Civil Engineering, or Management.",
      "Explore computational biology, bioinformatics, genomic sequencing, and BLAST algorithms.",
      "Understand geological disaster risks, structural safety, mitigation protocols, and geospatial mapping.",
      "Analyze Total Quality Management (TQM), Six Sigma, and operational excellence standards.",
    ],
    units: [
      { number: 1, title: "Interdisciplinary Concepts", hours: 14, topics: [
        { name: "Foundational Modules", subtopics: ["Bioinformatics: DNA/RNA sequences, biological databases, pairwise sequence alignment (Needleman-Wunsch, Smith-Waterman)", "Disaster Management: Hazards vs disasters, seismology, earthquake-resistant design, landslide mitigation", "TQM: Customer focus, continuous improvement (Kaizen), PDCA cycle, statistical quality control"] },
      ]},
      { number: 2, title: "Applied Methodologies", hours: 14, topics: [
        { name: "Analytical Tools", subtopics: ["Bioinformatics: Multiple sequence alignment, phylogenetic tree construction, protein 3D structure modeling", "Disaster Management: GIS mapping for vulnerability zones, remote sensing, crisis response plans", "TQM: Control charts (X-bar, R charts), process capability analysis, ISO 9000 quality standards"] },
      ]},
      { number: 3, title: "Case Studies & Seminars", hours: 12, topics: [
        { name: "Cross-Discipline Impact", subtopics: ["Applying computer science tools (machine learning, data analytics) to solve cross-departmental biological, environmental, or management challenges"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate literacy in interdisciplinary engineering and management domains." },
      { id: "CO2", description: "Apply computational thinking to solve cross-disciplinary domain problems." },
      { id: "CO3", description: "Communicate technical insights collaboratively with non-CS specialists." },
    ],
    books: {
      textbooks: [
        { author: "Arthur M. Lesk", title: "Introduction to Bioinformatics", edition: "5th", publisher: "Oxford University Press" },
      ],
      references: [
        { author: "Dale H. Besterfield", title: "Total Quality Management", edition: "5th", publisher: "Pearson" },
      ],
      online: [
        { title: "NCBI Bookshelf — Bioinformatics Tutorials", url: "https://ncbi.nlm.nih.gov" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Term Paper / Presentations", weightage: 20 },
    ],
    meta: { category: "OEC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Interdisciplinary (BT / CE / HSS)" },
  },

  "Minor Project": {
    code: "25B19CI691",
    title: "Minor Project (Capstone Group Project)",
    credits: { L: 0, T: 0, P: 4 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Data Structures", "Software Engineering"],
    objectives: [
      "Work in a small group (2-4 students) to design and implement a complete software or research project.",
      "Apply software engineering methodologies: requirements gathering, UML diagrams, and sprint milestones.",
      "Utilize modern tech stacks (React/Next.js, Python, Flutter, Docker, PyTorch, or embedded systems).",
      "Produce a structured project report and deliver a live working software demonstration.",
    ],
    units: [
      { number: 1, title: "Ideation, Design & Architecture", hours: 15, topics: [
        { name: "SRS & System Modeling", subtopics: ["Problem identification, feasibility analysis, software requirements specification (SRS)", "Architecture diagrams, database entity-relationship schema, API endpoint specifications"] },
      ]},
      { number: 2, title: "Implementation & Testing", hours: 30, topics: [
        { name: "Development & Integration", subtopics: ["Version-controlled development on GitHub, sprint reviews with faculty mentor", "Unit testing, integration testing, UI/UX polish, bug fixes"] },
      ]},
      { number: 3, title: "Final Defense & Report Submission", hours: 15, topics: [
        { name: "Evaluation & Viva", subtopics: ["Formal project report preparation as per JUIT thesis template", "Live software demonstration and viva-voce examination before external/internal faculty panel"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Formulate technical solutions for real-world academic or industrial problems." },
      { id: "CO2", description: "Implement a robust, working software application or research prototype." },
      { id: "CO3", description: "Collaborate effectively as a development team utilizing git branch workflows." },
      { id: "CO4", description: "Deliver a technical demonstration and defend architectural choices in an oral viva." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Project Committee", title: "Guidelines for Minor & Major Project Dissertations", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [
        { title: "GitHub Project Management Guides", url: "https://docs.github.com/issues" },
      ],
    },
    evaluation: [
      { component: "Continuous Faculty Mentor Evaluation", weightage: 40 },
      { component: "Mid-Term Architecture Defense", weightage: 20 },
      { component: "Final Live Demo, Report & Committee Viva", weightage: 40 },
    ],
    meta: { category: "PRC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Soft Skills for Employability": {
    code: "25B11HS611",
    title: "Soft Skills for Employability",
    credits: { L: 1, T: 0, P: 0 },
    semester: 6,
    branch: "All B.Tech Branches",
    prerequisites: ["Life Skills Lab"],
    objectives: [
      "Prepare students for the upcoming final-year corporate campus placement season.",
      "Fine-tune behavioral interview skills, situational judgment, and leadership articulation.",
      "Conduct industry-standard simulated mock interviews with personalized feedback.",
      "Master workplace ethics, corporate culture transitions, and negotiation basics.",
    ],
    units: [
      { number: 1, title: "Interview Mastery", hours: 6, topics: [
        { name: "Behavioral & Tech Interviews", subtopics: ["STAR technique for competency questions, tackling difficult HR questions, explaining project failures constructively"] },
      ]},
      { number: 2, title: "Advanced Corporate Readiness", hours: 6, topics: [
        { name: "Workplace Skills", subtopics: ["Cross-functional communication, negotiation basics, professional networking etiquette on LinkedIn, corporate dressing and etiquette"] },
      ]},
      { number: 3, title: "Mock Assessment Centers", hours: 6, topics: [
        { name: "Simulations", subtopics: ["Simulated assessment center rounds, case study problem solving, fast extempore rounds"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Demonstrate poise, confidence, and clarity in technical and HR placement interviews." },
      { id: "CO2", description: "Articulate project achievements and problem-solving impact using structured behavioral models." },
      { id: "CO3", description: "Transition seamlessly from an academic campus environment into a corporate tech team." },
    ],
    books: {
      textbooks: [
        { author: "Barun K. Mitra", title: "Personality Development and Soft Skills", edition: "2nd", publisher: "Oxford University Press" },
      ],
      references: [],
      online: [
        { title: "Big Interview — Video Interview Practice", url: "https://biginterview.com" },
      ],
    },
    evaluation: [
      { component: "Mock Interview Rounds & Video Submissions", weightage: 60 },
      { component: "End-Semester Viva & Profile Review", weightage: 40 },
    ],
    meta: { category: "HSC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  "Logical and Quantitative Techniques-II": {
    code: "25B11HS612",
    title: "Logical and Quantitative Techniques - II (Advanced Placement Aptitude)",
    credits: { L: 2, T: 0, P: 0 },
    semester: 6,
    branch: "CSE / IT",
    prerequisites: ["Logical & Quantitative Techniques-I"],
    objectives: [
      "Master advanced quantitative aptitude topics for Tier-1 technology companies (Google, Microsoft, Amazon).",
      "Solve complex Data Interpretation (DI) tables, bar charts, line graphs, and radar charts.",
      "Master critical reasoning, statement-assumptions, cause-and-effect, and syllogisms.",
      "Achieve speed and accuracy under company-specific adaptive test algorithms.",
    ],
    units: [
      { number: 1, title: "Advanced Quantitative Aptitude", hours: 10, topics: [
        { name: "Complex Quantitative Topics", subtopics: ["Geometry and mensuration, coordinate geometry, trigonometry applications", "Advanced permutations, combinations, and conditional probability", "Progressions (AP, GP, HP), logarithms, quadratic equations, and inequalities"] },
      ]},
      { number: 2, title: "Data Interpretation (DI)", hours: 10, topics: [
        { name: "Data Analysis", subtopics: ["Tables, multi-axis bar charts, pie charts, line graphs, and radar charts", "Data sufficiency questions, calculating growth percentages and ratio variations quickly"] },
      ]},
      { number: 3, title: "Advanced Verbal & Critical Reasoning", hours: 10, topics: [
        { name: "Deductive Logic", subtopics: ["Statement & assumptions, statement & conclusions, cause & effect, course of action", "Reading comprehension speed reading and inference identification"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Solve advanced multi-step quantitative and geometric aptitude problems." },
      { id: "CO2", description: "Interpret and analyze complex data tables and statistical visualizations rapidly." },
      { id: "CO3", description: "Pass pre-interview online screening rounds for top multinational software companies." },
    ],
    books: {
      textbooks: [
        { author: "Arun Sharma", title: "How to Prepare for Data Interpretation for CAT", edition: "7th", publisher: "McGraw-Hill" },
        { author: "R.S. Aggarwal", title: "Quantitative Aptitude for Competitive Examinations", edition: "Revised", publisher: "S. Chand" },
      ],
      references: [],
      online: [
        { title: "PrepInsta — Company-specific Placement Papers", url: "https://prepinsta.com" },
      ],
    },
    evaluation: [
      { component: "Weekly Mock Company Test Runs", weightage: 50 },
      { component: "End-Semester Comprehensive Aptitude Assessment", weightage: 50 },
    ],
    meta: { category: "HSC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities & Social Sciences" },
  },

  // ─── SEMESTERS 7 & 8 CAPSTONES & ELECTIVES ──────────────────────────────────

  "Major Project Part - 1": {
    code: "25B19CI791",
    title: "Major Project (Part - 1)",
    credits: { L: 0, T: 0, P: 8 },
    semester: 7,
    branch: "CSE / IT",
    prerequisites: ["Minor Project"],
    objectives: [
      "Formulate a significant, novel research or product engineering challenge in Computer Science.",
      "Conduct an exhaustive literature review of peer-reviewed IEEE/ACM journals and conference papers.",
      "Design a robust system architecture, database schema, and high-level algorithmic flow.",
      "Develop a proof-of-concept prototype and defend technical feasibility before faculty reviewers.",
    ],
    units: [
      { number: 1, title: "Literature Survey & Problem Formulation", hours: 25, topics: [
        { name: "Research Survey", subtopics: ["Identifying research gap, reading 15+ peer-reviewed papers, defining problem statement", "Formulating mathematical model or product requirements specification"] },
      ]},
      { number: 2, title: "Architecture & Detailed Design", hours: 35, topics: [
        { name: "System Engineering", subtopics: ["Block diagrams, data flow diagrams (DFD), sequence diagrams, component selection", "Prototype implementation of critical algorithms or foundational modules"] },
      ]},
      { number: 3, title: "Interim Defense & Documentation", hours: 20, topics: [
        { name: "Mid-Term Review", subtopics: ["Part-1 thesis report submission adhering to IEEE/JUIT guidelines", "Presentation of progress and proof-of-concept before departmental committee"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Conduct rigorous academic literature surveys to identify valid research and engineering gaps." },
      { id: "CO2", description: "Architect scalable software or hardware-software systems with defined interfaces." },
      { id: "CO3", description: "Produce a structured interim thesis report and defend project feasibility in an oral review." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Project Committee", title: "Guidelines for Undergraduate Major Project Dissertations", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [
        { title: "IEEE Xplore Digital Library", url: "https://ieeexplore.ieee.org" },
        { title: "Google Scholar", url: "https://scholar.google.com" },
      ],
    },
    evaluation: [
      { component: "Faculty Guide Continuous Assessment", weightage: 40 },
      { component: "Literature Survey & SRS Report Evaluation", weightage: 30 },
      { component: "Departmental Committee Midterm Presentation & Viva", weightage: 30 },
    ],
    meta: { category: "PRC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Summer Training - III (6 weeks)": {
    code: "25B19CI792",
    title: "Summer Training / Industrial Internship - III",
    credits: { L: 0, T: 0, P: 0 },
    semester: 7,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Complete a rigorous 6 to 8-week pre-final year software engineering or research corporate internship.",
      "Work in enterprise environments on production codebases, cloud pipelines, or R&D units.",
      "Document company contributions, architecture diagrams, test results, and mentor evaluation letters.",
      "Present technical achievements before the departmental evaluation committee.",
    ],
    units: [
      { number: 1, title: "Corporate Software Engineering", hours: 80, topics: [
        { name: "Professional Internship", subtopics: ["Full-time engineering contribution in registered corporate tech companies", "Working with enterprise CI/CD, microservice architectures, and agile sprints"] },
      ]},
      { number: 2, title: "Report & Seminar Presentation", hours: 20, topics: [
        { name: "Evaluation", subtopics: ["Comprehensive technical report submission with company certificate", "Seminar defense and oral viva-voce before departmental faculty panel"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Apply advanced computing expertise to solve real-world industry problems." },
      { id: "CO2", description: "Operate effectively within corporate engineering hierarchies and agile sprint schedules." },
      { id: "CO3", description: "Author technical documentation following professional standards." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Training Committee", title: "Industrial Internship Evaluation Manual", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [],
    },
    evaluation: [
      { component: "Company Mentor Performance Certificate", weightage: 30 },
      { component: "Technical Internship Report Evaluation", weightage: 30 },
      { component: "Faculty Committee Viva-Voce Defense", weightage: 40 },
    ],
    meta: { category: "PRC", difficulty: "Medium", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 6": {
    code: "25B14CI71X",
    title: "Discipline Elective - 6 (Quantum / RL / HPC / Forensics)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 7,
    branch: "CSE / IT",
    prerequisites: ["Operating Systems", "AI & ML"],
    objectives: [
      "Track A (Quantum Computing): Qubits, quantum superposition, entanglement, quantum gates, Shor and Grover algorithms.",
      "Track B (Reinforcement Learning): Markov Decision Processes (MDP), Bellman equations, Q-Learning, Deep Q Networks (DQN), Policy Gradients.",
      "Track C (High Performance Computing): Parallel programming, MPI, OpenMP, GPU architecture, CUDA kernel optimization.",
      "Track D (Digital Forensics): File system forensics, memory analysis, network artifact extraction, malware analysis.",
    ],
    units: [
      { number: 1, title: "Foundational Theory", hours: 12, topics: [
        { name: "Advanced Mathematical Principles", subtopics: ["Quantum: Hilbert space, Pauli matrices, quantum circuit model", "RL: Agent-environment loop, value functions, exploration vs exploitation (epsilon-greedy)", "HPC: Flynn's taxonomy, Amdahl's and Gustafson's laws, memory coherence", "Forensics: Chain of custody, disk imaging, volatile memory acquisition"] },
      ]},
      { number: 2, title: "Algorithms & Frameworks", hours: 14, topics: [
        { name: "Applied Computing", subtopics: ["Quantum: Qiskit quantum circuit simulator, quantum teleportation implementation", "RL: Training Gym environments with Stable-Baselines3, PPO, Actor-Critic", "HPC: Writing parallel loops in OpenMP, CUDA kernel programming with threads and blocks", "Forensics: Volatility memory analysis, Autopsy forensic browser, packet carve with Wireshark"] },
      ]},
      { number: 3, title: "Emerging Frontiers", hours: 14, topics: [
        { name: "Case Studies", subtopics: ["Post-quantum cryptography, multi-agent reinforcement learning, exascale supercomputing, incident response workflows"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Formulate computational problems in quantum, reinforcement learning, HPC, or digital forensics." },
      { id: "CO2", description: "Program and benchmark solutions using modern specialized toolkits (Qiskit, CUDA, PyTorch RL)." },
      { id: "CO3", description: "Analyze theoretical scalability and security boundaries of frontier computing systems." },
    ],
    books: {
      textbooks: [
        { author: "Michael A. Nielsen, Isaac L. Chuang", title: "Quantum Computation and Quantum Information", edition: "10th Anniversary", publisher: "Cambridge" },
        { author: "Richard S. Sutton, Andrew G. Barto", title: "Reinforcement Learning: An Introduction", edition: "2nd", publisher: "MIT Press" },
      ],
      references: [
        { author: "David B. Kirk, Wen-mei W. Hwu", title: "Programming Massively Parallel Processors", edition: "3rd", publisher: "Morgan Kaufmann" },
      ],
      online: [
        { title: "Qiskit Textbook — Learn Quantum Computation", url: "https://qiskit.org/learn" },
        { title: "OpenAI Spinning Up in Deep RL", url: "https://spinningup.openai.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Term Paper & Seminar", weightage: 20 },
    ],
    meta: { category: "PEC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Open Elective - 2": {
    code: "25B14OE71X",
    title: "Open Elective - 2 (Entrepreneurship / IPR / Finance)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 7,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Track A (Entrepreneurship): Understand startup ideation, product-market fit, venture funding, and unit economics.",
      "Track B (IPR & Patent Law): Learn patents, patent drafting, trademarks, copyright law, and international treaties.",
      "Track C (Financial Management): Master financial statements, discounted cash flows, valuation, and capital allocation.",
    ],
    units: [
      { number: 1, title: "Foundations of Innovation & Law", hours: 12, topics: [
        { name: "Principles", subtopics: ["Entrepreneurship: Lean startup methodology, MVP validation, business model canvas", "IPR: Criteria for patentability (novelty, inventive step, industrial utility), Indian Patent Act", "Finance: Balance sheets, P&L statements, cash flow analysis, time value of money"] },
      ]},
      { number: 2, title: "Practical Application", hours: 14, topics: [
        { name: "Mechanisms", subtopics: ["Entrepreneurship: Pitch deck formulation, term sheets, cap tables, customer acquisition cost (CAC)", "IPR: Patent search on Google Patents/WIPO, drafting claims, patent filing procedure in India", "Finance: Capital budgeting (NPV, IRR), working capital management, risk and return trade-offs"] },
      ]},
      { number: 3, title: "Case Studies", hours: 14, topics: [
        { name: "Real-world Analysis", subtopics: ["Case studies on high-growth Indian tech startups, patent litigation disputes (Apple vs Samsung), corporate M&A analysis"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Evaluate venture opportunities and build viable commercialization business plans." },
      { id: "CO2", description: "Navigate intellectual property laws and file patent disclosures." },
      { id: "CO3", description: "Interpret corporate financial statements and compute engineering project investments." },
    ],
    books: {
      textbooks: [
        { author: "Eric Ries", title: "The Lean Startup", edition: "1st", publisher: "Crown Business" },
        { author: "Prasanna Chandra", title: "Financial Management: Theory and Practice", edition: "10th", publisher: "McGraw-Hill" },
      ],
      references: [
        { author: "V.K. Ahuja", title: "Law Relating to Intellectual Property Rights", edition: "3rd", publisher: "LexisNexis" },
      ],
      online: [
        { title: "WIPO — World Intellectual Property Organization", url: "https://wipo.int" },
        { title: "Y Combinator Startup School", url: "https://startupschool.org" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Business Plan / Patent Draft Project", weightage: 20 },
    ],
    meta: { category: "OEC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities / Management" },
  },

  "Major Project Part - 2": {
    code: "25B19CI891",
    title: "Major Project (Part - 2) / Full Semester Industrial Internship",
    credits: { L: 0, T: 0, P: 16 },
    semester: 8,
    branch: "CSE / IT",
    prerequisites: ["Major Project Part - 1"],
    objectives: [
      "Complete the implementation, deployment, and testing of the capstone engineering project OR complete a full-semester 6-month corporate industry internship.",
      "Conduct empirical validation, benchmarking, and error analysis against state-of-the-art baselines.",
      "Author and submit a peer-reviewed research paper to a recognized IEEE/Springer/ACM conference or indexed journal.",
      "Draft a complete undergraduate engineering thesis dissertation and defend it before external examiners.",
    ],
    units: [
      { number: 1, title: "Full System Implementation & Benchmarking", hours: 60, topics: [
        { name: "Final Build & Validation", subtopics: ["Complete backend, frontend, algorithmic logic, or hardware prototype completion", "Stress testing, automated test suite execution, security audits, empirical benchmarking against existing baselines"] },
      ]},
      { number: 2, title: "Research Paper Authoring", hours: 30, topics: [
        { name: "Scientific Dissemination", subtopics: ["Drafting research paper in IEEE standard 2-column format", "Submitting paper to Scopus/UGC-CARE indexed conferences or journals"] },
      ]},
      { number: 3, title: "Thesis Writing & Final Viva-Voce Defense", hours: 40, topics: [
        { name: "Final Dissertation & Examination", subtopics: ["Comprehensive undergraduate dissertation writing with literature survey, methodology, results, and conclusion", "Live system demonstration and comprehensive oral defense before external university examiner panel"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Deliver a fully functional, tested, and deployed enterprise software system or research prototype." },
      { id: "CO2", description: "Publish or communicate technical discoveries in peer-reviewed scientific conferences." },
      { id: "CO3", description: "Author a comprehensive academic thesis following rigorous scholarly citation conventions." },
      { id: "CO4", description: "Demonstrate authoritative domain expertise in oral defense before external university examiners." },
    ],
    books: {
      textbooks: [
        { author: "JUIT Project Committee", title: "Guidelines for Undergraduate Major Project Dissertations", edition: "2025", publisher: "JUIT Waknaghat" },
      ],
      references: [],
      online: [
        { title: "IEEE Author Center — Manuscript Formatting", url: "https://ieeeauthorcenter.ieee.org" },
      ],
    },
    evaluation: [
      { component: "Continuous Guide Assessment", weightage: 30 },
      { component: "Research Paper Submission & Peer Review", weightage: 20 },
      { component: "External Examiner Dissertation Evaluation & Viva", weightage: 50 },
    ],
    meta: { category: "PRC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Discipline Elective - 7": {
    code: "25B14CI81X",
    title: "Discipline Elective - 7 (Robotics / TinyML / SDN / Healthcare AI)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 8,
    branch: "CSE / IT",
    prerequisites: ["Computer Networks", "AI & ML"],
    objectives: [
      "Track A (Robotics): Robot Operating System (ROS), forward/inverse kinematics, SLAM, and path planning.",
      "Track B (Edge AI & TinyML): Model quantization, pruning, TensorFlow Lite, and running neural inference on microcontrollers.",
      "Track C (Software Defined Networks): SDN control/data plane separation, OpenFlow protocol, and network virtualization.",
      "Track D (Healthcare AI): Medical imaging segmentation (U-Net), clinical NLP, and disease classification.",
    ],
    units: [
      { number: 1, title: "Domain Foundations", hours: 12, topics: [
        { name: "Advanced Principles", subtopics: ["Robotics: Coordinate frames, DH parameters, trajectory planning", "TinyML: Resource constraints, INT8 quantization, weight pruning, microcontroller memory maps", "SDN: Centralized network control, OpenFlow messages, Mininet simulation", "Healthcare: DICOM imaging format, sensitivity/specificity, survival analysis"] },
      ]},
      { number: 2, title: "System Architecture", hours: 14, topics: [
        { name: "Applied Practice", subtopics: ["Robotics: ROS nodes, topics, services, Gazebo simulation", "TinyML: Deploying TFLite models on ESP32 or Raspberry Pi", "SDN: Writing Ryu/POX SDN controllers for traffic steering", "Healthcare: Training U-Net for MRI brain tumor segmentation"] },
      ]},
      { number: 3, title: "Capstone Project Case Studies", hours: 14, topics: [
        { name: "Frontier Applications", subtopics: ["Autonomous mobile robots (AMRs), ambient intelligence, 5G network slicing, regulatory approval for medical AI"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Design autonomous, edge-constrained, programmable network, or healthcare AI architectures." },
      { id: "CO2", description: "Deploy specialized software across target hardware or virtualized platforms." },
      { id: "CO3", description: "Critique trade-offs between computational latency, memory footprint, and inference accuracy." },
    ],
    books: {
      textbooks: [
        { author: "Pete Warden, Daniel Situnayake", title: "TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers", edition: "1st", publisher: "O'Reilly" },
        { author: "John J. Craig", title: "Introduction to Robotics: Mechanics and Control", edition: "4th", publisher: "Pearson" },
      ],
      references: [
        { author: "Thomas D. Nadeau, Ken Gray", title: "SDN: Software Defined Networks", edition: "1st", publisher: "O'Reilly" },
      ],
      online: [
        { title: "ROS.org — Robot Operating System Documentation", url: "https://ros.org" },
        { title: "TensorFlow Lite Guide", url: "https://tensorflow.org/lite" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Term Project", weightage: 20 },
    ],
    meta: { category: "PEC", difficulty: "Hard", lastUpdated: "2026-09-08", faculty: "Dept. of CSE & IT" },
  },

  "Open Elective - 3": {
    code: "25B14OE81X",
    title: "Open Elective - 3 (Project Management / Org Behavior / Digital Marketing)",
    credits: { L: 3, T: 0, P: 0 },
    semester: 8,
    branch: "CSE / IT",
    prerequisites: [],
    objectives: [
      "Track A (Project Management): Agile, Scrum, Kanban, Gantt charts, Critical Path Method (CPM/PERT), and risk registers.",
      "Track B (Organizational Behavior): Workplace motivation, organizational culture, conflict resolution, and leadership dynamics.",
      "Track C (Digital Marketing): Search Engine Optimization (SEO), growth funnels, performance marketing, and conversion rate optimization.",
    ],
    units: [
      { number: 1, title: "Organizational & Project Principles", hours: 12, topics: [
        { name: "Foundational Theories", subtopics: ["Project Management: Project initiation, scope baseline, work breakdown structure (WBS)", "OB: Maslow and Herzberg motivation theories, Big Five personality traits, team development stages (Tuckman)", "Marketing: Digital consumer journey, inbound vs outbound marketing, search engine indexing fundamentals"] },
      ]},
      { number: 2, title: "Execution Methodologies", hours: 14, topics: [
        { name: "Applied Frameworks", subtopics: ["Project Management: CPM network scheduling, earned value management (EVM), resource leveling", "OB: Transformational vs transactional leadership, organizational change management", "Marketing: Keyword research, on-page and technical SEO, pay-per-click (Google Ads), social media analytics"] },
      ]},
      { number: 3, title: "Strategic Applications", hours: 14, topics: [
        { name: "Enterprise Case Studies", subtopics: ["Post-mortem analysis of major engineering project failures and successes, workplace psychology interventions, viral growth campaigns"] },
      ]},
    ],
    outcomes: [
      { id: "CO1", description: "Schedule and manage technology projects using CPM/PERT and agile sprint tracking." },
      { id: "CO2", description: "Analyze workplace human dynamics and lead collaborative cross-functional teams." },
      { id: "CO3", description: "Formulate data-driven digital marketing and user acquisition campaigns." },
    ],
    books: {
      textbooks: [
        { author: "Project Management Institute", title: "A Guide to the Project Management Body of Knowledge (PMBOK Guide)", edition: "7th", publisher: "PMI" },
        { author: "Stephen P. Robbins, Timothy A. Judge", title: "Organizational Behavior", edition: "19th", publisher: "Pearson" },
      ],
      references: [
        { author: "Philip Kotler, Kevin Lane Keller", title: "Marketing Management", edition: "16th", publisher: "Pearson" },
      ],
      online: [
        { title: "Google Digital Garage — Fundamentals of Digital Marketing", url: "https://learndigital.withgoogle.com" },
      ],
    },
    evaluation: [
      { component: "Mid Semester Exam", weightage: 30 },
      { component: "End Semester Exam", weightage: 50 },
      { component: "Assignments & Case Study Presentations", weightage: 20 },
    ],
    meta: { category: "OEC", difficulty: "Easy", lastUpdated: "2026-09-08", faculty: "Dept. of Humanities / Management" },
  },

};
