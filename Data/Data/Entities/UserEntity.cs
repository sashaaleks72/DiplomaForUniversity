﻿namespace Data.Entities;

public class UserEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Patronymic { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string HashedPassword { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public string RefreshToken { get; set; } = null!;

    public DateTime Birthday { get; set; }

    public DateTime TokenCreated { get; set; }

    public DateTime TokenExpires { get; set; }

    public string Gender { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public int RoleId { get; set; }

    public virtual RoleEntity Role { get; set; } = null!;
    public virtual List<CommentEntity> Comments { get; set; } = null!;
}
