﻿using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;
using webapi.Models.Settings;

namespace webapi.Services
{
    public class QuestionServices
    {
        private readonly IMongoCollection<Question> _questionsCollection;
        private readonly IMongoCollection<Answer> _answersCollection;
        private readonly IConfiguration _configuration;

        public QuestionServices(IOptions<DatabaseSettings> databaseSettings, IConfiguration configuration)
        {
            _configuration = configuration;

            var connectionString = _configuration["DatabaseSettings:ConnectionString"];
            var mongoClient = new MongoClient(connectionString);

            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);

            _questionsCollection = mongoDatabase.GetCollection<Question>(databaseSettings.Value.QuestionsCollectionName);
            _answersCollection = mongoDatabase.GetCollection<Answer>(databaseSettings.Value.AnswersCollectionName);
        }

        public async Task<List<Question>> GetAllQuestions() => await _questionsCollection.Find(_ => true).ToListAsync();

        public async Task<List<Question>> GetQuestionById(string id) => await _questionsCollection.Find(x => x.Id == id).ToListAsync();

        public async Task<List<Answer>> GetAllAnswers(string id) => await _answersCollection.Find(x => x.QuestionId == id).ToListAsync();

        public async Task CreateQuestion(Question question) => await _questionsCollection.InsertOneAsync(question);

        public async Task UpdateQuestion(string id, Question question) => await _questionsCollection.ReplaceOneAsync(x => x.Id == id, question);

        public async Task DeleteQuestion(string id) => await _questionsCollection.DeleteOneAsync(x => x.Id == id);
    }
}