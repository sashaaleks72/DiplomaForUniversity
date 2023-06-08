using Castle.Core.Internal;
using Catalog.Host.Services.Abstractions;
using Chat.API.Models;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;

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
            if (userConnection.ChatId == Guid.Empty && userConnection.ConversationTopic != null)
            {
                var chat = new ChatEntity { ConversationTopic = userConnection.ConversationTopic };
                await _dbContext.Chats.AddAsync(chat);
                await _dbContext.SaveChangesAsync();

                var userChat = new UserChatEntity { ChatId = chat.Id, ConnectionId = Context.ConnectionId, UserId = userConnection.UserId };
                await _dbContext.UserChats.AddAsync(userChat);
                await _dbContext.SaveChangesAsync();

                await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
                await Clients.Group(chat.Id.ToString()).SendAsync("ReceiveMessage", _botUser, $"{userConnection.UserFullName} started conversation");
            }

            if (userConnection.ChatId != Guid.Empty)
            {
                var userChat = new UserChatEntity { ChatId = userConnection.ChatId, ConnectionId = Context.ConnectionId, UserId = userConnection.UserId };
                await _dbContext.UserChats.AddAsync(userChat);
                await _dbContext.SaveChangesAsync();

                await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.ChatId.ToString());
                await Clients.Group(userConnection.ChatId.ToString()).SendAsync("ReceiveMessage", _botUser, $"Operator {userConnection.UserFullName} has joined");
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userChat = await _dbContext.UserChats.SingleOrDefaultAsync(uc => uc.ConnectionId == Context.ConnectionId);

            if (userChat != null)
            {
                string userFullName = $"{userChat.User.FirstName} {userChat.User.LastName}";
                await Clients.Group(userChat.ChatId.ToString()).SendAsync("ReceiveMessage", _botUser, $"{userFullName} has stopped conversation");

                var receivedChat = await _dbContext.Chats.SingleOrDefaultAsync(c => c.Id == userChat.ChatId);

                if (receivedChat != null)
                {
                    _dbContext.Chats.Remove(receivedChat);
                    await _dbContext.SaveChangesAsync();
                }
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            var userChat = await _dbContext.UserChats.SingleOrDefaultAsync(uc => uc.ConnectionId == Context.ConnectionId);

            if (userChat != null)
            {
                string userFullName = $"{userChat.User.FirstName} {userChat.User.LastName}";
                await Clients.Group(userChat.ChatId.ToString()).SendAsync("ReceiveMessage", userFullName, message);
            }
        }
    }
}
