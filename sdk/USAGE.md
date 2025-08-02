<!-- Start SDK Example Usage [usage] -->
```python
# Synchronous Example
from nest_api import NestAPI
import os


with NestAPI(
    server_url="https://api.example.com",
    api_key_auth=os.getenv("NESTAPI_API_KEY_AUTH", ""),
) as na_client:

    res = na_client.git_hub.list_issues(page=1)

    # Handle response
    print(res)
```

</br>

The same SDK client can also be used to make asychronous requests by importing asyncio.
```python
# Asynchronous Example
import asyncio
from nest_api import NestAPI
import os

async def main():

    async with NestAPI(
        server_url="https://api.example.com",
        api_key_auth=os.getenv("NESTAPI_API_KEY_AUTH", ""),
    ) as na_client:

        res = await na_client.git_hub.list_issues_async(page=1)

        # Handle response
        print(res)

asyncio.run(main())
```
<!-- End SDK Example Usage [usage] -->