# Priority Task Command

You are tasked with finding and working on the highest priority task assigned to the current user in Jira.

**Features**:
- Automatically finds your highest priority Jira task
- Identifies if it's a frontend component task
- Creates branch, implements component, runs tests
- Commits, pushes, and creates PR automatically
- **Updates Jira status** (using Atlassian MCP):
  - Moves to "In Progress" / "En Progreso" when development starts
  - Moves to "In Review" / "En Revisión" when PR is created
- Supports both **English and Spanish** Jira workflows

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

   ## Step 6.0: Move Jira Issue to "In Progress" (Atlassian MCP)

   - Use the **Atlassian MCP** `mcp__atlassian__getTransitionsForJiraIssue` tool:
     - cloudId: [from step 2]
     - issueIdOrKey: [issue key from step 4]

   - From the transitions response, find a transition where the destination status name matches:
     - **English**: "In Progress" or "In Development"
     - **Spanish**: "En Progreso" or "En Desarrollo"
     - **Pattern**: Case-insensitive match on status name containing "progres" or "desarrollo"

   - Extract the transition ID from the matching transition

   - Use the **Atlassian MCP** `mcp__atlassian__transitionJiraIssue` tool:
     - cloudId: [from step 2]
     - issueIdOrKey: [issue key from step 4]
     - transition: { "id": "[extracted transition ID]" }

   - **If no matching transition found**:
     - Display warning: "⚠️ No 'In Progress' transition found for this issue. It may already be in progress or have a different workflow. Continuing with development..."
     - **CONTINUE** with the workflow (do not stop)

   - **If transition fails**:
     - Display warning: "⚠️ Could not move issue to 'In Progress' status (may already be in progress). Continuing with development..."
     - Log the error for user awareness
     - **CONTINUE** with the workflow (do not stop)

   - **If transition succeeds**:
     - Display: "✅ Moved ISSUE-KEY to '{status name}' status" (use actual status name from API)
     - Proceed to next step

   ## Step 6.1: Component Development (frontend-dev-expert)

   - Use the Task tool with `subagent_type: "frontend-dev-expert"`
   - Pass complete task information:
     - Jira issue key (e.g., "PROJ-123")
     - Issue summary
     - Issue description (may contain Figma links, acceptance criteria)
     - Labels and issue type

   - The agent will:
     - **Create feature branch** (`feat/ISSUE-KEY-component-name`)
     - Retrieve Figma design specs (if Figma link provided)
     - Implement the component following Atomic Design principles
     - Create all required files (*.tsx, *.stories.tsx, *.spec.tsx, index.ts)
     - Run tests locally (`npm test`)
     - Run linting (`npm run lint:fix`)
     - Verify all tests pass
     - Return structured markdown output with:
       - Component details (name, atomic level, files)
       - **Branch name** (created by the agent)
       - Test results (status, counts)
       - Code quality status (linting, type check)
       - Accessibility checklist

   - **CRITICAL**: Wait for the agent to complete and check test results

   ## Step 6.2: Verify Tests Passed and Extract Information

   - Check the structured markdown output from frontend-dev-expert agent
   - **If tests FAILED** (look for "Status: ❌ FAILED" in Test Results section):
     - STOP the workflow immediately
     - Display the test failures to the user
     - Ask the user:
       - "Tests are failing. Would you like me to:"
       - "1. Attempt to fix the test failures"
       - "2. Review the test output and provide guidance"
       - "3. Stop here and let you fix manually"
     - Wait for user decision before proceeding

   - **If tests PASSED** (look for "Status: ✅ PASSED" in Test Results section):
     - Extract information from the structured markdown output:
       - **Branch name** (from "Git Branch" section) - **REQUIRED for next step**
       - Component name (from "Component Details" section)
       - Atomic Design level (from "Component Details" section)
       - List of files created (from "Files" subsection)
       - Test count and status (from "Test Results" section)
       - Lint status (from "Code Quality" section)
       - Jira issue key (if available, extract from branch name or input)
     - Proceed to next step

   ## Step 6.3: Git Operations (git-workflow)

   - Use the Task tool with `subagent_type: "git-workflow"`
   - Pass the following information (extracted from frontend-dev-expert's output):
     - **Branch name** (from step 6.2) - **REQUIRED**
     - Component name
     - Atomic Design level
     - List of changed files
     - Test results (count and status)
     - Jira issue key (if available)
     - Jira issue summary (if available)

   - The agent will:
     - Verify it's on the correct branch (created by frontend-dev-expert)
     - Stage all component files
     - Create commit with conventional commit format
     - Include Jira reference in commit message
     - Include test results in commit message
     - Push to remote with upstream tracking
     - Verify push was successful
     - Return structured markdown output with:
       - Branch name
       - Commit SHA
       - Files staged
       - Commit details
       - Push status

   - **If git operations fail**:
     - Display the error to the user
     - Provide suggested fixes
     - Ask if they want to retry or stop

   ## Step 6.4: Create Pull Request (pr-creator)

   - Use the Task tool with `subagent_type: "pr-creator"`
   - Pass combined information from both previous agents:

     **From git-workflow (step 6.3)**:
     - Branch name
     - Commit SHA
     - Commit type and scope
     - Files staged
     - Push status

     **From frontend-dev-expert (step 6.1)**:
     - Component name
     - Atomic Design level
     - Files created
     - Test results (count, status, accessibility)
     - Code quality status (linting, type check)

     **From Jira context (original input)**:
     - Issue key
     - Issue summary
     - Issue URL (construct: `https://[yoursite].atlassian.net/browse/ISSUE-KEY`)

     **Configuration**:
     - Base branch: `main` (default)

   - The agent will:
     - Generate comprehensive PR description with:
       - Summary of changes
       - Component details
       - Test results and counts
       - Accessibility checklist
       - Review checklist
       - Link to Jira issue
       - Note about Chromatic CI/CD
     - Create PR using GitHub CLI (`gh pr create`)
     - Apply appropriate labels based on atomic level (frontend, component, atom/molecule/organism)
     - Assign PR to current user
     - Return structured markdown output with:
       - PR number and URL
       - PR title and status
       - Labels applied
       - Linked issue
       - Next steps (CI/CD, review, merge)

   - **If PR creation fails**:
     - Display the error to the user
     - Check if PR already exists for this branch
     - Provide manual PR creation command as fallback

   ## Step 6.4.1: Move Jira Issue to "In Review" (Atlassian MCP)

   - Use the **Atlassian MCP** `mcp__atlassian__getTransitionsForJiraIssue` tool:
     - cloudId: [from step 2]
     - issueIdOrKey: [issue key from step 4]

   - From the transitions response, find a transition where the destination status name matches:
     - **English**: "In Review" or "Code Review" or "Review" or "Peer Review"
     - **Spanish**: "En Revisión" or "En Revision" or "Revisión de Código" or "Revision de Codigo"
     - **Pattern**: Case-insensitive match on status name containing "review" or "revisión" or "revision"

   - Extract the transition ID from the matching transition

   - Use the **Atlassian MCP** `mcp__atlassian__transitionJiraIssue` tool:
     - cloudId: [from step 2]
     - issueIdOrKey: [issue key from step 4]
     - transition: { "id": "[extracted transition ID]" }

   - **If no matching transition found**:
     - Display warning: "⚠️ No 'In Review' transition found for this issue. PR was created successfully, but issue status not updated. You may need to update it manually in Jira."
     - **CONTINUE** to final report (do not stop)

   - **If transition fails**:
     - Display warning: "⚠️ Could not move issue to 'In Review' status. PR was created successfully, but issue status not updated."
     - Log the error for user awareness
     - **CONTINUE** to final report (do not stop)

   - **If transition succeeds**:
     - Display: "✅ Moved ISSUE-KEY to '{status name}' status" (use actual status name from API)
     - Proceed to final report

   ## Step 6.5: Final Report to User

   Compile the structured markdown outputs from all three agents and display a comprehensive summary:

   ```markdown
   # ✅ Jira Task Completed Successfully

   ## 📋 Task Details
   - **Issue**: ISSUE-KEY - [Issue Summary]
   - **Priority**: [High/Medium/Low]
   - **Type**: [Frontend/UI/Component/etc.]
   - **Status**: ✅ [Current Status Name] (moved from [original status] → [progress status] → [review status])
   - **Link**: https://[yoursite].atlassian.net/browse/ISSUE-KEY

   *Note: Status names shown as they appear in your Jira (may be in Spanish or English)*

   ## 🎨 Component Implemented
   - **Name**: [ComponentName]
   - **Atomic Level**: [Atom/Molecule/Organism]
   - **Path**: src/components/[level]/[ComponentName]/
   - **Files Created**: 4 files
     - ComponentName.tsx
     - ComponentName.stories.tsx
     - ComponentName.spec.tsx
     - index.ts

   ## ✅ Testing & Quality
   - **Component Tests**: [X/X passing]
   - **Accessibility Tests**: [X/X passing] - WCAG 2.1 AA compliant
   - **Total Tests**: [X] tests passing
   - **Linting**: ✅ Passed
   - **Type Check**: ✅ Passed

   ## 🌿 Git Operations
   - **Branch**: feat/ISSUE-KEY-component-name
   - **Commit SHA**: [commit SHA]
   - **Pushed**: ✅ Successfully pushed to origin

   ## 🔀 Pull Request
   - **PR Number**: #[number]
   - **PR Title**: [PR title]
   - **PR URL**: [PR URL]
   - **Status**: Open
   - **Labels**: frontend, component, [atom/molecule/organism]

   ## ⏳ Next Steps
   1. ⏳ **Chromatic CI/CD** will run automatically on the PR
      - Visual regression testing
      - Storybook deployment
      - Check PR comments for Storybook URL

   2. 🧪 **GitHub Actions** will run:
      - All Playwright tests (215 tests)
      - Lint and format checks
      - TypeScript compilation
      - Build verification

   3. 👀 **Code Review**: Request review from team members
      - Jira issue is now in "In Review" status
      - Reviewers can see the PR linked to the Jira issue

   4. 🎉 **Merge & Close**: Once approved and CI passes
      - Merge PR to main
      - Manually move Jira issue to "Done" or use automation

   ## 🔗 Quick Links
   - **View PR**: [PR URL]
   - **View Jira**: [Jira URL]
   - **Chromatic**: Will be available after CI/CD completes

   ---

   **Workflow completed successfully!** All agents (frontend-dev-expert → git-workflow → pr-creator) finished their tasks.
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
   - **ALWAYS** extract required information from structured markdown outputs
   - **ALWAYS** pass branch name from frontend-dev-expert to git-workflow
   - **ALWAYS** update Jira status at appropriate points using **Atlassian MCP**:
     - Move to "In Progress"/"En Progreso" before development
     - Move to "In Review"/"En Revisión" after PR creation
   - **USE PATTERN MATCHING** for status transitions to support both English and Spanish:
     - For "In Progress": Match "progres", "desarrollo", "in progress", "in development"
     - For "In Review": Match "review", "revisión", "revision", "code review"
   - **CONTINUE** on Jira status transition failures (warn but don't stop workflow)
   - **ALWAYS** provide clear error messages and recovery options
   - **ALWAYS** link the Jira issue in the PR description
   - **REMEMBER** that Chromatic runs automatically via CI/CD (don't run manually)

   ## Agent Communication Protocol

   All agents communicate via **structured markdown** format:

   1. **frontend-dev-expert** outputs:
      - Component Details (name, atomic level, path, files)
      - **Git Branch** (branch name - CRITICAL for next step)
      - Test Results (status, counts)
      - Code Quality (linting, type check)

   2. **git-workflow** receives branch name and outputs:
      - Git Operations (branch, commit SHA, push status)
      - Files Staged
      - Commit Details
      - Push Details

   3. **pr-creator** receives combined info and outputs:
      - Pull Request Created (number, title, URL)
      - PR Details (branch, labels, linked issue)
      - Next Steps (CI/CD expectations)

   The orchestrator (this command) extracts information from each agent's structured markdown output and passes it to the next agent in the chain.

   ## Complete Workflow Summary

   ```
   1. Find highest priority Jira task (Atlassian MCP)
   2. Identify if it's frontend-related
   3. ✅ Move Jira to "In Progress" / "En Progreso" (Atlassian MCP)
   4. → frontend-dev-expert: Create branch + implement component
   5. → git-workflow: Stage + commit + push
   6. → pr-creator: Create pull request
   7. ✅ Move Jira to "In Review" / "En Revisión" (Atlassian MCP)
   8. Display comprehensive report to user
   ```

   **Jira Status Flow**:
   - English: Todo/Backlog → **In Progress** → **In Review** → Done
   - Spanish: Por Hacer/Pendiente → **En Progreso** → **En Revisión** → Hecho
   - Note: Final status (Done/Hecho) is set manually after merge, or can be automated

   ## Atlassian MCP Integration

   This workflow uses the **Atlassian MCP (Model Context Protocol)** for all Jira operations:
   - `mcp__atlassian__atlassianUserInfo` - Get current user
   - `mcp__atlassian__getAccessibleAtlassianResources` - Get cloud ID
   - `mcp__atlassian__searchJiraIssuesUsingJql` - Search for assigned tasks
   - `mcp__atlassian__getJiraIssue` - Get issue details
   - `mcp__atlassian__getTransitionsForJiraIssue` - Get available status transitions
   - `mcp__atlassian__transitionJiraIssue` - Update issue status

   The MCP handles authentication and provides direct access to your Atlassian workspace.