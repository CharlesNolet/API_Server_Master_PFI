module.exports = 
class New{
    constructor(title,text,userId,userURL,userName)
    {
        this.Id = 0;
        this.Title = title !== undefined ? title : "";
        this.Text = text !== undefined ? text : "";
        this.UserId = userId !== undefined ? userId : 0;
        this.UserURL = userUrl !== undefined ? userUrl : "";
        this.UserName = userName !== underfined ? urserName : "";
        this.Created = created !== undefined ? created : 0;
        this.ImageGUID = imageGUID !== undefined ? imageGUID : "";
    }

    static valid(instance) {
        const Validator = new require('./validator');
        let validator = new Validator();
        validator.addField('Id','integer');
        validator.addField('Title','string');
        validator.addField('Text','string');
        validator.addField('UserId', 'integer');
        validator.addField('Created','integer');
        validator.addField('UserURL','string');
        validator.addField('UserName','string');
        return validator.test(instance);
    }
}