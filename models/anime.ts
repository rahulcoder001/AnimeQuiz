import mongoose from "mongoose";

const AnimeSchema = new mongoose.Schema({
    Anime: String,
    Membership:Number,
    Question: String,
    description: String
});

const Newsschema = new mongoose.Schema({
    title:String,
    author:String
})

const QuestionSchema = new mongoose.Schema({
    AnimeId: String,
    questions: [{
        Sn:Number,
        Question: String,
        option1:String,
        option2:String,
        option3:String,
        option4:String,
        answer:Number, //option number 
    }]
})


export const Animelist = mongoose.models.Animelist || mongoose.model("Animelist", AnimeSchema);
export const QuestionList = mongoose.models.QuestionList || mongoose.model("QuestionList",QuestionSchema);
export const News = mongoose.models.News || mongoose.model("News",Newsschema);
