const emailService = {
    //Creates allItems object that collects all listItems from context grouped by PM name
    //Formats each list item as [Project Name] - [Advisor Name] and pushes to an array which is then joined to create a string containing the body of the PM update email
    formatEmailUpdate(listItems) {
        const allItems = {}
        listItems.forEach(item => {
            const itemPmName = item.pm_name;
            allItems[itemPmName] ? allItems[itemPmName].push(item) : allItems[itemPmName] = [item];
        })

        const updateArray = []

        for (let [key, value] of Object.entries(allItems)) {
            updateArray.push(`${key}%0A%0A${value.map(item => `${item.project.replace('&', '%26')} - ${item.contact}%0A`).join('')}`)
        }

        return updateArray.join('%0A%0A')
    },
    //Gets all the email addresses of all PMs with current list items and joins into a string of emails to be supplied to the mailto
    formatUpdateEmailAddresses(listItems) {
        const pmEmails = []
        listItems && listItems.forEach(item => !pmEmails.includes(item.pm_email) && pmEmails.push(item.pm_email))
        return pmEmails.join('; ')
    }
}

export default emailService;