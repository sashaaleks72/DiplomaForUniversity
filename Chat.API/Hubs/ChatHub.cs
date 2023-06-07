using Castle.Core.Internal;
using Catalog.Host.Services.Abstractions;
using Chat.API.Models;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.SignalR;

namespace Chat.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string _botUser;
        private readonly ApplicationDbContext _dbContext;

        public ChatHub(IDbContextWrapper<ApplicationDbContext> dbContextWrapper)
        {
            _dbContext = dbContextWrapper.DbContext;
            _botUser = "Chat bot";
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            if (string.IsNullOrEmpty(userConnection.ChatId) && userConnection.ConversationTopic != null)
            {
                var chat = new ChatEntity { ConversationTopic = userConnection.ConversationTopic };
                await _dbContext.Chats.AddAsync(chat);
                await _dbContext.SaveChangesAsync();
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
                await Clients.Group(chat.Id.ToString()).SendAsync("ReceiveMessage", _botUser, $"{userConnection.UserFullName} started conversation");
            }

            if (!string.IsNullOrEmpty(userConnection.ChatId))
            {
                await Clients.Group(userConnection.ChatId!).SendAsync("ReceiveMessage", _botUser, $"Operator {userConnection.UserFullName} has joined");
            }
        }
    }
}
