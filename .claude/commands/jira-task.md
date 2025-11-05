# Priority Task Command

You are tasked with finding and working on the highest priority task assigned to the current user in Jira.

Follow these steps:

1. **Get current user information**:
   - Use the `mcp__atlassian__atlassianUserInfo` tool to get the current user's account ID

2. **Get accessible Atlassian resources**:
   - Use the `mcp__atlassian__getAccessibleAtlassianResources` tool to get the cloud ID

3. **Search for assigned tasks**:
   - Use the `mcp__atlassian__searchJiraIssuesUsingJql` tool with the following JQL query:
   - `assignee = currentUser() AND resolution = Unresolved ORDER BY priority DESC, created DESC`
   - Request fields: `summary`, `description`, `status`, `issuetype`, `priority`, `labels`, `created`

4. **Identify the highest priority task**:
   - The first result will be the highest priority task
   - Display the task information to the user including:
     - Issue key
     - Summary
     - Description
     - Priority
     - Status
     - Labels
     - Issue Type

5. **Determine if it's a frontend task**:
   - Check if the task is frontend-related by examining:
     - Labels containing: `frontend`, `ui`, `design-system`, `component`, `react`, `storybook`
     - Issue type containing: `Frontend`, `UI`, `Design System`
     - Summary or description containing keywords: `component`, `design system`, `UI`, `frontend`, `React`, `Storybook`, `atom`, `molecule`, `organism`

6. **Process the task based on type**:

   **If NOT frontend-related:**
   - Inform the user that this task may need different expertise
   - Display the task details and ask if they want to proceed manually

   **If frontend-related - Execute Agent Workflow:**

   ## Step 6.1: Component Development (frontend-dev-expert)

   - Use the Task tool with `subagent_type: "frontend-dev-expert"`
   - Pass complete task information:
     - Jira issue key (e.g., "PROJ-123")
     - Issue summary
     - Issue description (may contain Figma links, acceptance criteria)
     - Labels and issue type

   - The agent will:
     - Retrieve Figma design specs (if Figma link provided)
     - Implement the component following Atomic Design principles
     - Create all required files (*.tsx, *.stories.tsx, *.spec.tsx, index.ts)
     - Run tests locally (`npm test`)
     - Run linting (`npm run lint:fix`)
     - Verify all tests pass
     - Return structured output with component details and test results

   - **CRITICAL**: Wait for the agent to complete and check test results

   ## Step 6.2: Verify Tests Passed

   - Check the output from frontend-dev-expert agent
   - **If tests FAILED**:
     - STOP the workflow immediately
     - Display the test failures to the user
     - Ask the user:
       - "Tests are failing. Would you like me to:"
       - "1. Attempt to fix the test failures"
       - "2. Review the test output and provide guidance"
       - "3. Stop here and let you fix manually"
     - Wait for user decision before proceeding

   - **If tests PASSED**:
     - Extract component information:
       - Component name
       - Atomic Design level (atom/molecule/organism)
       - List of files created/modified
       - Test count and status
       - Lint status
     - Proceed to next step

   ## Step 6.3: Git Operations (git-workflow)

   - Use the Task tool with `subagent_type: "git-workflow"`
   - Pass the following information:
     - Component name (from step 6.1)
     - Atomic Design level
     - List of changed files
     - Jira issue key
     - Jira issue summary
     - Current branch (get from `git branch --show-current`)

   - The agent will:
     - Create feature branch: `feat/ISSUE-KEY-component-name`
     - Stage all component files
     - Create commit with conventional commit format
     - Include Jira reference in commit message
     - Push to remote with upstream tracking
     - Verify push was successful
     - Return branch name, commit SHA, and push status

   - **If git operations fail**:
     - Display the error to the user
     - Provide suggested fixes
     - Ask if they want to retry or stop

   ## Step 6.4: Create Pull Request (pr-creator)

   - Use the Task tool with `subagent_type: "pr-creator"`
   - Pass the following information:
     - Branch name (from step 6.3)
     - Commit SHA (from step 6.3)
     - Component details (from step 6.1):
       - Name
       - Atomic Design level
       - Files created
       - Test results (count, status)
       - Lint status
     - Jira context:
       - Issue key
       - Issue summary
       - Issue URL (construct: `https://[yoursite].atlassian.net/browse/ISSUE-KEY`)
     - Base branch: `main` (default)

   - The agent will:
     - Generate comprehensive PR description with:
       - Summary of changes
       - Component details
       - Test results
       - Accessibility checklist
       - Review checklist
       - Link to Jira issue
       - Note about Chromatic CI/CD
     - Create PR using GitHub CLI (`gh pr create`)
     - Apply appropriate labels (frontend, component, atom/molecule/organism)
     - Assign PR to current user
     - Return PR number and URL

   - **If PR creation fails**:
     - Display the error to the user
     - Check if PR already exists for this branch
     - Provide manual PR creation command as fallback

   ## Step 6.5: Final Report to User

   Display a comprehensive summary:

   ```
   ✅ Jira Task Completed Successfully

   📋 Task Details
   - Issue: ISSUE-KEY - [Issue Summary]
   - Link: https://[yoursite].atlassian.net/browse/ISSUE-KEY
   - Priority: [High/Medium/Low]

   🎨 Component Implemented
   - Name: [ComponentName]
   - Type: [Atom/Molecule/Organism]
   - Path: src/components/[level]/[ComponentName]/
   - Files: 4 files created

   ✅ Testing
   - Component Tests: [X/X passing]
   - Accessibility Tests: [X/X passing]
   - Lint: Passed
   - Type Check: Passed

   🌿 Git
   - Branch: feat/ISSUE-KEY-component-name
   - Commit: [commit SHA]
   - Pushed: ✅

   🔀 Pull Request
   - PR #[number]: [PR title]
   - URL: [PR URL]
   - Status: Open

   ⏳ Next Steps
   1. Chromatic CI/CD will run automatically on the PR
   2. Visual regression testing will be performed
   3. Storybook will be deployed - check PR comments for URL
   4. Request review from team members
   5. Once approved and CI passes, merge to main

   🔗 Quick Links
   - View PR: [PR URL]
   - View Jira: [Jira URL]
   ```

   ## Error Handling Throughout Workflow

   At each step, if an error occurs:
   1. **Stop the workflow immediately**
   2. **Display the error** with context (which step failed, what error occurred)
   3. **Provide suggestions** for fixing the error
   4. **Ask the user** how they want to proceed:
      - Retry the failed step
      - Attempt automatic fix
      - Stop and let user fix manually
   5. **Wait for user decision** before proceeding

   ## Important Notes

   - **DO NOT** proceed to git operations if tests are failing
   - **DO NOT** create PR if git push fails
   - **ALWAYS** wait for each agent to complete before proceeding to next
   - **ALWAYS** verify success of each step before continuing
   - **ALWAYS** provide clear error messages and recovery options
   - **ALWAYS** link the Jira issue in the PR description
   - **REMEMBER** that Chromatic runs automatically via CI/CD (don't run manually)