const Repository = require('./repository');
const ImageFilesRepository = require('./imageFilesRepository.js');
const New = require('./new.js');
const utilities = require("../utilities");
module.exports = 
class NewsRepository extends Repository 
{
    constructor(req)
    {
        super('News', true);
        this.newsInfo = new Repository('News');
        this.req = req;
        this.setBindExtraDataMethod(this.bindNewsAndImageURL);
    }

    bindNewsAndImageURL(news)
    {
        if (news) 
        {
            //let user = this.newsInfo.get(news.UserId);
            let title = "unknown";
            if (news !== null)
                title = news.Title;
            let bindedImage = {...news};

            bindedImage["Title"] = title;
            bindedImage["Date"] = utilities.secondsToDateString(news["Created"]);
            if (news["ImageGUID"] != "")
            {
                bindedImage["OriginalURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getImageFileURL(news["ImageGUID"]);
                bindedImage["ThumbnailURL"] = "http://" + this.req.headers["host"] + ImageFilesRepository.getThumbnailFileURL(news["ImageGUID"]);
            } 
            else {
                bindedImage["OriginalURL"] = "";
                bindedImage["ThumbnailURL"] = "";
            }
            return bindedImage;
        }
        return null;
    }

    add(news) 
    {
        news["Created"] = utilities.nowInSeconds();
        if (New.valid(news)) 
        {
            news["ImageGUID"] = ImageFilesRepository.storeImageData("", news["ImageData"]);
            delete news["ImageData"];
            return super.add(news);
        }
        return null;
    }
    update(news) 
    {
        news["Created"] = utilities.nowInSeconds();
        if (New.valid(news)) 
        {
            let foundNews = super.get(news.Id);
            if (foundNews != null) 
            {
                news["ImageGUID"] = ImageFilesRepository.storeImageData(news["ImageGUID"], news["ImageData"]);
                delete news["ImageData"];
                return super.update(news);
            }
        }
        return false;
    }
    remove(id)
    {
        let foundNews = super.get(id);
        if (foundNews) 
        {
            ImageFilesRepository.removeImageFile(foundNews["ImageGUID"]);
            return super.remove(id);
        }
        return false;
    }
}