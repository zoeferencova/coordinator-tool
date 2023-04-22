# Coordinator Tool
Streamline your coordinator workflow

Live app: https://coordinator.vercel.app/

## Summary

As a client service coordinator, I found that there were many aspects of my job that were repetitive and inefficient. I would write the same email dozens of times in one day and keep track of all of my correspondence in a notebook where I had to rewrite my task list every day. I created the coordinator tool to address these pain points and automate as much of the job as possible.

The coordinator tool makes tracking reach-outs and organizing tasks extremely easy. The main list tab and completed tab can be used to track, change and revert the status of items. Users can also link the project or contact to external sites (such as a project page or contact page from an external CRM system) for easy navigation. Users are able to create email templates for emails that are commonly sent which then template in values from the item list so that emails can be composed and populated with values for each list item in one click. The dashboard page keeps track of some key statistics that allow the user to keep track of request volume trends as well as other insightful stats and KPI's.

## Technologies Used

* React with CSS Modules
* D3 for visualizations

## Demo Account

To access the demo account, click "See a demo" on the landing page. You will be automatically logged in to the demo account where you can use the app as a regular user.

## To-do

- [ ] Update tests (currently learning new methods for testing)
- [ ] Transition from Context API to Redux
- [ ] Transition AuthenticatedApp component to a functional component
- [ ] Update pie chart to use proper D3 update pattern
- [ ] Add coworking capabilities: let users join teams (like Slack workspaces) and view the team's list items, add comment functionality on list items to make coverage easier.
- [ ] Allow user to edit account and PM information
- [ ] Work on getting chart data more cleanly from DB (simpler SQL queries?)
- [ ] Make app more generic -- allow users to create custom columns (like Notion databases) instead of having the app be so specific to the coordinator use case
- [ ] Add SMS templating and composition functionality (Python script?)
- [ ] Allow bulk emailing
- [ ] Store contact info for quicker email composition (need to strengthen security/encryption in this case)
