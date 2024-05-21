import bcrypt

def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')

def verify_password(input_password, stored_hashed_password):
    return bcrypt.checkpw(input_password.encode('utf-8'), stored_hashed_password.encode('utf-8'))