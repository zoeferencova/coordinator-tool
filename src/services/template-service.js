const TemplateService = {
    //Gets current selected template from context and replaces values of template strings [PROJECT], [CONTACT] and [PM] with values from the listItem that are passed in as props
    //Returns array with format [[formatted template content], [formatted template subject]]
    formatTemplate(content, subject, data, doctor) {
        const { project, contact, pm_name } = data;

        const fixedProject = project.replace('&', '%26')
        const splitWord = word => word.split(' ');
        const numWords = word => splitWord(word).length;

        const arr = [content, subject];
        const formattedArr = arr.map(item => item.replace('[PROJECT]', (splitWord(fixedProject)[numWords(fixedProject) - 1] === 'Space' || splitWord(fixedProject)[numWords(fixedProject) - 1] === 'Industry') ? `the ${fixedProject}` : fixedProject).replace('[PM]', pm_name).replace('[CONTACT]', doctor ? `Dr. ${splitWord(contact)[numWords(contact) - 1]}` : splitWord(contact)[0]));
        return formattedArr;
    },

    //Replaces characters used for new line to be compatible with mailto
    formatTemplateForEmail(content, subject, data, doctor) {
        const template = this.formatTemplate(content, subject, data, doctor)[0]
        return template.replace(/\n/g, '%0D%0A')
    }
}

export default TemplateService;