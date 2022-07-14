import * as fernet from "constants";

const token = "gAAAAABizIOIx-YuYKvEJJkjKgs7dw7KV_7Hcs1nONUL7lDDGLeYmhqyp-oqZpvvoBpuALSCmHwgQsZj5mUCX0_JmH-1wNsb08bm0LoZmwzIaw5uWY4wRPVDUjtFKIjDkJZ1s3vXrSehESoBLQQRvXLf5bhnSkGEdwLrJJmPCl9tz3cOKZzaLpypAekVkhBV_Adophl552rG8DEv9zNXp1d97D3vofd8Q6sjR5G0JZE0RRVqbzMm1t5-gDkbO5APmd2lksrGZAms0XNK7VQkPAK5Qg2VEVgN8g=="

const textDecoder = new TextDecoder();
console.log(JSON.parse(textDecoder.decode(fernet.Client.decode(token))))
