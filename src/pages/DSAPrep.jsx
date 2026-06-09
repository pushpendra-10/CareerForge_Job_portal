import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Code2, 
  Terminal, 
  Play, 
  Send, 
  RefreshCw, 
  Sparkles,
  Trophy,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Info
} from 'lucide-react';

const DSAPrep = () => {
  const [activeTopic, setActiveTopic] = useState('arrays');
  const [solvedProblems, setSolvedProblems] = useState(new Set([1, 4])); // Pre-solved
  const [selectedProblemId, setSelectedProblemId] = useState(2); // "Reverse Linked List"
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const [runLogs, setRunLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [codeValue, setCodeValue] = useState('');

  const dsaSheetData = {
    arrays: {
      title: 'Arrays & Hashing',
      problems: [
        {
          id: 1,
          title: 'Two Sum',
          difficulty: 'Easy',
          desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
          starters: {
            javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for(let i=0; i<nums.length; i++) {\n        const diff = target - nums[i];\n        if(map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
            python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        hashmap = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in hashmap:\n                return [hashmap[diff], i]\n            hashmap[num] = i\n        return []`,
            cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> mp;\n        for(int i=0; i<nums.size(); i++) {\n            int diff = target - nums[i];\n            if(mp.count(diff)) return {mp[diff], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};`
          }
        },
        {
          id: 2,
          title: 'Container With Most Water',
          difficulty: 'Medium',
          desc: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.',
          input: 'height = [1,8,6,2,5,4,8,3,7]',
          output: '49',
          constraints: 'n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4',
          starters: {
            javascript: `function maxArea(height) {\n    let max = 0;\n    let l = 0, r = height.length - 1;\n    while(l < r) {\n        const area = Math.min(height[l], height[r]) * (r - l);\n        max = Math.max(max, area);\n        if(height[l] < height[r]) l++;\n        else r--;\n    }\n    return max;\n}`,
            python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        max_area = 0\n        l, r = 0, len(height) - 1\n        while l < r:\n            area = min(height[l], height[r]) * (r - l)\n            max_area = max(max_area, area)\n            if height[l] < height[r]:\n                l += 1\n            else:\n                r -= 1\n        return max_area`,
            cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int max_area = 0, l = 0, r = height.size() - 1;\n        while(l < r) {\n            max_area = max(max_area, min(height[l], height[r]) * (r - l));\n            if(height[l] < height[r]) l++;\n            else r--;\n        }\n        return max_area;\n    }\n};`
          }
        }
      ]
    },
    lists: {
      title: 'Linked Lists',
      problems: [
        {
          id: 3,
          title: 'Reverse Linked List',
          difficulty: 'Easy',
          desc: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
          input: 'head = [1,2,3,4,5]',
          output: '[5,4,3,2,1]',
          constraints: 'The number of nodes in the list is the range [0, 5000].\n-5000 <= Node.val <= 5000',
          starters: {
            javascript: `function reverseList(head) {\n    let prev = null, curr = head;\n    while(curr) {\n        let nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}`,
            python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        prev, curr = None, head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev`,
            cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while(curr) {\n            ListNode* nextNode = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextNode;\n        }\n        return prev;\n    }\n};`
          }
        }
      ]
    },
    trees: {
      title: 'Trees & Graphs',
      problems: [
        {
          id: 4,
          title: 'Invert Binary Tree',
          difficulty: 'Easy',
          desc: 'Given the root of a binary tree, invert the tree, and return its root.',
          input: 'root = [4,2,7,1,3,6,9]',
          output: '[4,7,2,9,6,3,1]',
          constraints: 'The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100',
          starters: {
            javascript: `function invertTree(root) {\n    if(!root) return null;\n    const temp = root.left;\n    root.left = invertTree(root.right);\n    root.right = invertTree(temp);\n    return root;\n}`,
            python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not root: return None\n        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root`,
            cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        if(!root) return nullptr;\n        TreeNode* temp = root->left;\n        root->left = invertTree(root->right);\n        root->right = invertTree(temp);\n        return root;\n    }\n};`
          }
        },
        {
          id: 5,
          title: 'Number of Islands',
          difficulty: 'Medium',
          desc: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
          input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
          output: '2',
          constraints: 'm == grid.length, n == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is "0" or "1".',
          starters: {
            javascript: `function numIslands(grid) {\n    let count = 0;\n    function dfs(r, c) {\n        if(r<0 || c<0 || r>=grid.length || c>=grid[0].length || grid[r][c]==="0") return;\n        grid[r][c] = "0";\n        dfs(r+1, c);\n        dfs(r-1, c);\n        dfs(r, c+1);\n        dfs(r, c-1);\n    }\n    for(let r=0; r<grid.length; r++) {\n        for(let c=0; c<grid[0].length; c++) {\n            if(grid[r][c]==="1") {\n                count++;\n                dfs(r, c);\n            }\n        }\n    }\n    return count;\n}`,
            python: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        if not grid: return 0\n        count = 0\n        def dfs(r, c):\n            if r<0 or c<0 or r>=len(grid) or c>=len(grid[0]) or grid[r][c] == '0':\n                return\n            grid[r][c] = '0'\n            dfs(r+1, c)\n            dfs(r-1, c)\n            dfs(r, c+1)\n            dfs(r, c-1)\n        for r in range(len(grid)):\n            for c in range(len(grid[0])):\n                if grid[r][c] == '1':\n                    count += 1\n                    dfs(r, c)\n        return count`,
            cpp: `class Solution {\npublic:\n    void dfs(int r, int c, vector<vector<char>>& grid) {\n        if(r<0 || c<0 || r>=grid.size() || c>=grid[0].size() || grid[r][c] == \'0\') return;\n        grid[r][c] = \'0\';\n        dfs(r+1, c, grid);\n        dfs(r-1, c, grid);\n        dfs(r, c+1, grid);\n        dfs(r, c-1, grid);\n    }\n    int numIslands(vector<vector<char>>& grid) {\n        int count = 0;\n        for(int r=0; r<grid.size(); r++) {\n            for(int c=0; c<grid[0].size(); c++) {\n                if(grid[r][c] == \'1\') {\n                    count++;\n                    dfs(r, c, grid);\n                }\n            }\n        }\n        return count;\n    }\n};`
          }
        }
      ]
    }
  };

  // Locate selected problem
  let activeProblem = null;
  Object.keys(dsaSheetData).forEach(topicKey => {
    const prob = dsaSheetData[topicKey].problems.find(p => p.id === selectedProblemId);
    if (prob) activeProblem = prob;
  });

  // Pre-load code when problem changes
  React.useEffect(() => {
    if (activeProblem) {
      const langStarter = activeProblem.starters[editorLanguage] || '';
      setCodeValue(langStarter);
    }
  }, [selectedProblemId, editorLanguage]);

  const toggleProblemSolved = (id) => {
    setSolvedProblems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleRunCode = () => {
    setRunning(true);
    setRunLogs(['$ Compiling dependencies...', '$ Checking syntax boundaries...']);
    
    setTimeout(() => {
      setRunLogs(prev => [
        ...prev,
        '$ Running Test Cases on mock data...',
        '---------------------------------------',
        `Input: ${activeProblem.input}`,
        `Expected Output: ${activeProblem.output}`,
        'Actual Output: ' + activeProblem.output,
        'Status: SUCCESS',
        'Time: 24ms | Memory: 11.2MB',
        '---------------------------------------',
        '✅ Test cases passed successfully!'
      ]);
      setRunning(false);
    }, 1500);
  };

  const handleSubmitCode = () => {
    setSubmitting(true);
    setRunLogs(['$ Launching code suite submissions...', '$ Testing edge cases...']);
    
    setTimeout(() => {
      setRunLogs(prev => [
        ...prev,
        'Testing Test Case [1/15] - Passed',
        'Testing Test Case [5/15] - Passed',
        'Testing Test Case [10/15] - Passed',
        'Testing Test Case [15/15] - Passed',
        '---------------------------------------',
        '🎉 All 15 Test Cases passed successfully!',
        '🚀 Reward: +50 XP claimed!'
      ]);
      setSolvedProblems(prev => new Set([...prev, activeProblem.id]));
      setSubmitting(false);
    }, 2000);
  };

  const totalProblemsCount = Object.values(dsaSheetData).reduce((acc, curr) => acc + curr.problems.length, 0);

  return (
    <div className="dsa-sheet-view animate-fade-in">
      
      {/* Overview Stats Bar */}
      <div className="dsa-overview-bar glass-card">
        <div className="dsa-progress-section">
          <div className="dsa-progress-info">
            <h3>DSA Track Progress</h3>
            <span>{solvedProblems.size} / {totalProblemsCount} Solved ({Math.round((solvedProblems.size / totalProblemsCount) * 100)}%)</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${(solvedProblems.size / totalProblemsCount) * 100}%` }} />
          </div>
        </div>

        <div className="dsa-rewards-badge">
          <Trophy className="trophy-gold" />
          <div>
            <strong>Rank: Guardian</strong>
            <span>Level 4 Coding Ace</span>
          </div>
        </div>
      </div>

      {/* Main Splits Panel */}
      <div className="dsa-split-layout">
        
        {/* Left Side: Sheets Navigator */}
        <div className="dsa-sheet-navigation">
          {Object.keys(dsaSheetData).map(topicKey => {
            const topic = dsaSheetData[topicKey];
            const solvedInTopic = topic.problems.filter(p => solvedProblems.has(p.id)).length;
            const isOpen = activeTopic === topicKey;
            
            return (
              <div key={topicKey} className="glass-card topic-accordion">
                <button 
                  className="accordion-header"
                  onClick={() => setActiveTopic(isOpen ? '' : topicKey)}
                >
                  <div className="accordion-title-group">
                    <BrainCircuit size={18} className="topic-icon" />
                    <div>
                      <h4>{topic.title}</h4>
                      <span className="sub-stat">{solvedInTopic} / {topic.problems.length} Completed</span>
                    </div>
                  </div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="problems-table">
                    {topic.problems.map(prob => {
                      const isSolved = solvedProblems.has(prob.id);
                      return (
                        <div 
                          key={prob.id} 
                          className={`problem-row ${selectedProblemId === prob.id ? 'active' : ''}`}
                          onClick={() => setSelectedProblemId(prob.id)}
                        >
                          <button 
                            className="checkbox-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProblemSolved(prob.id);
                            }}
                          >
                            {isSolved ? (
                              <CheckSquare size={18} className="cb-checked" />
                            ) : (
                              <Square size={18} className="cb-unchecked" />
                            )}
                          </button>

                          <div className="prob-info">
                            <span className="prob-title">{prob.title}</span>
                            <span className={`badge-difficulty ${prob.difficulty.toLowerCase()}`}>
                              {prob.difficulty}
                            </span>
                          </div>

                          <span className="badge badge-info">SOLVE</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side: Mock IDE */}
        <div className="mock-ide-container glass-card">
          {activeProblem ? (
            <div className="ide-split-box">
              
              {/* Question Specifications */}
              <div className="problem-specs">
                <div className="specs-header">
                  <h3>{activeProblem.title}</h3>
                  <span className={`badge-difficulty ${activeProblem.difficulty.toLowerCase()}`}>
                    {activeProblem.difficulty}
                  </span>
                </div>

                <div className="specs-body">
                  <p className="problem-desc">{activeProblem.desc}</p>
                  
                  <div className="specs-section">
                    <h5>Example Case</h5>
                    <div className="specs-code-box">
                      <strong>Input:</strong> {activeProblem.input}<br />
                      <strong>Output:</strong> {activeProblem.output}
                    </div>
                  </div>

                  <div className="specs-section">
                    <h5>Constraints</h5>
                    <pre className="constraints-box">{activeProblem.constraints}</pre>
                  </div>
                </div>
              </div>

              {/* Code Editor and output terminal */}
              <div className="code-playground">
                
                {/* Language Select bar */}
                <div className="editor-controls">
                  <div className="control-left">
                    <Code2 size={16} />
                    <select 
                      className="form-select borderless" 
                      value={editorLanguage}
                      onChange={(e) => setEditorLanguage(e.target.value)}
                    >
                      <option value="javascript">JavaScript (ES6)</option>
                      <option value="python">Python (3.x)</option>
                      <option value="cpp">C++ (GCC 17)</option>
                    </select>
                  </div>
                  <button className="icon-btn-sm" onClick={() => setCodeValue(activeProblem.starters[editorLanguage])}>
                    <RefreshCw size={12} /> Reset
                  </button>
                </div>

                {/* Main Code writing block */}
                <div className="textarea-wrapper">
                  <div className="line-numbers">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span key={i}>{i + 1}</span>
                    ))}
                  </div>
                  <textarea 
                    className="monospaced-textarea"
                    value={codeValue}
                    onChange={(e) => setCodeValue(e.target.value)}
                    spellCheck="false"
                  />
                </div>

                {/* Control Action Buttons */}
                <div className="ide-actions">
                  <button 
                    className="btn btn-secondary" 
                    onClick={handleRunCode}
                    disabled={running || submitting}
                  >
                    <Play size={14} /> Run Test Case
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleSubmitCode}
                    disabled={running || submitting}
                  >
                    <Send size={14} /> Submit Solution
                  </button>
                </div>

                {/* Simulated Compilation Logs Terminal */}
                <div className="ide-terminal">
                  <div className="terminal-header">
                    <Terminal size={14} />
                    <span>Compiler Console Logs</span>
                  </div>
                  
                  <div className="terminal-logs">
                    {runLogs.length === 0 ? (
                      <span className="log-empty">Press "Run Test Case" or "Submit Solution" to trigger compilation.</span>
                    ) : (
                      runLogs.map((log, idx) => (
                        <div key={idx} className={`log-line ${log.startsWith('✅') || log.startsWith('🎉') ? 'log-success' : ''}`}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="empty-ide">
              <Info size={40} className="info-icon" />
              <h3>No problem selected</h3>
              <p>Select a DSA challenge from the sheets to compile code.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default DSAPrep;
