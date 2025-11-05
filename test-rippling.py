import requests
from urllib.parse import urlencode
import json

# cookies = {
#     "cf_clearance": "rxuBg9n1oHp.33AN1nPG.XBZ2ePOnhPMWiiTtC.ID2o-1728682079-1.2.1.1-GOnFx6i2lVipF0UcHhCkgMTaFbjgfeeG.s.ayTu6Y4BF0ChCgs.AZvggdwzI2j7lIBKoonFHUMAElLkpxXJPMzPFBDeiINOAPC56YltalyTqTPcexdYiVLBrtP4IHE9qvC0G4kXZu0owiWt85ccKgROeka_4DJycD8i7LeZ14IQw4uTi63i4tpF1hjfbrjxsKLT1001_Aj14C3F4tyTZ3l7pRax5XGlQStmCXJwt2_TUkRvjEECNHk4UAXIxXKLG1aSvZaagcmFXgsU36RTNvdSJB.876T.IN8kKgYfUsbveNhtPorWTU9FAbq_Lj7H6sCoIeSLHMJK6wRXTlZmZUzuX8uEsmXxJ1sdDsgB1C6noWav0BhYltr.BX4U70_D09fx5UNO3hXE99sxXtZyyig",
# }

headers = {
    "Host": "app.rippling.com",
    "Accept": "application/json, text/plain, */*",
    "app-version": "v3.0.19-1228",
    "Authorization": "Bearer pHBtdggqlO8jQKKtPcscyW40Gc4MSb",
    "baggage": "sentry-environment=production,sentry-public_key=ff20ab3a07184e1a90eb78a1a705dac5,sentry-release=3.0.19-1228,sentry-trace_id=79809ccc76354315a863a1e489354f84",
    "login-agent": "rippling-mobile",
    # "company": "657b7ce3a4222e38ce1830e5",
    "sentry-trace": "79809ccc76354315a863a1e489354f84-1ea57bb70bf64da2-0",
    "Accept-Language": "en-US,en;q=0.9",
    # "device-fingerprint": "E870E6F6-5D48-4D2E-9AD6-5488464C32AE",
    "x-amzn-trace-id": "2205d315-5d72-47d8-a211-ea31e7f7ed68",
    "User-Agent": "rippling/1020 CFNetwork/3826.600.41 Darwin/24.6.0",
    "role": "657b7ceaa4222e38ce18324a",
    "Content-Type": "application/x-www-form-urlencoded",
    # 'Cookie': 'cf_clearance=rxuBg9n1oHp.33AN1nPG.XBZ2ePOnhPMWiiTtC.ID2o-1728682079-1.2.1.1-GOnFx6i2lVipF0UcHhCkgMTaFbjgfeeG.s.ayTu6Y4BF0ChCgs.AZvggdwzI2j7lIBKoonFHUMAElLkpxXJPMzPFBDeiINOAPC56YltalyTqTPcexdYiVLBrtP4IHE9qvC0G4kXZu0owiWt85ccKgROeka_4DJycD8i7LeZ14IQw4uTi63i4tpF1hjfbrjxsKLT1001_Aj14C3F4tyTZ3l7pRax5XGlQStmCXJwt2_TUkRvjEECNHk4UAXIxXKLG1aSvZaagcmFXgsU36RTNvdSJB.876T.IN8kKgYfUsbveNhtPorWTU9FAbq_Lj7H6sCoIeSLHMJK6wRXTlZmZUzuX8uEsmXxJ1sdDsgB1C6noWav0BhYltr.BX4U70_D09fx5UNO3hXE99sxXtZyyig',
}


response = requests.get(
    "https://app.rippling.com/api/auth_ext/get_account_info/getAllIdsAndPageSize/",
    headers=headers,
)
response.raise_for_status()
out = response.json()


with open("rippling-get-all-ids-and-page-size.json", "w") as f:
    json.dump(out, f)


for role in out:
    print(role["role"]["company"])
    headers = {
        "Host": "app.rippling.com",
        "Accept": "application/json, text/plain, */*",
        "app-version": "v3.0.19-1228",
        "Authorization": "Bearer pHBtdggqlO8jQKKtPcscyW40Gc4MSb",
        "baggage": "sentry-environment=production,sentry-public_key=ff20ab3a07184e1a90eb78a1a705dac5,sentry-release=3.0.19-1228,sentry-trace_id=79809ccc76354315a863a1e489354f84",
        "login-agent": "rippling-mobile",
        "company": role["role"]["company"]["$oid"],
        "sentry-trace": "79809ccc76354315a863a1e489354f84-1ea57bb70bf64da2-0",
        "Accept-Language": "en-US,en;q=0.9",
        "device-fingerprint": "E870E6F6-5D48-4D2E-9AD6-5488464C32AE",
        "x-amzn-trace-id": "2205d315-5d72-47d8-a211-ea31e7f7ed68",
        "User-Agent": "rippling/1020 CFNetwork/3826.600.41 Darwin/24.6.0",
        "role": role["id"],
        "Content-Type": "application/x-www-form-urlencoded",
        # 'Cookie': 'cf_clearance=rxuBg9n1oHp.33AN1nPG.XBZ2ePOnhPMWiiTtC.ID2o-1728682079-1.2.1.1-GOnFx6i2lVipF0UcHhCkgMTaFbjgfeeG.s.ayTu6Y4BF0ChCgs.AZvggdwzI2j7lIBKoonFHUMAElLkpxXJPMzPFBDeiINOAPC56YltalyTqTPcexdYiVLBrtP4IHE9qvC0G4kXZu0owiWt85ccKgROeka_4DJycD8i7LeZ14IQw4uTi63i4tpF1hjfbrjxsKLT1001_Aj14C3F4tyTZ3l7pRax5XGlQStmCXJwt2_TUkRvjEECNHk4UAXIxXKLG1aSvZaagcmFXgsU36RTNvdSJB.876T.IN8kKgYfUsbveNhtPorWTU9FAbq_Lj7H6sCoIeSLHMJK6wRXTlZmZUzuX8uEsmXxJ1sdDsgB1C6noWav0BhYltr.BX4U70_D09fx5UNO3hXE99sxXtZyyig',
    }

    payload = urlencode({"query": f"id={role["id"]}&limit=1"})
    response = requests.get(
        f"https://app.rippling.com/api/hub/api/employment_roles_with_company/{role['id']}/",
        headers=headers,
    )
    try:
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        print(response.text)
        print(response.status_code)
        print(role["role"]["company"])
        continue
    out = response.json()
    print(out)

    with open(f"rippling-get-{role['id']}.json", "w") as f:
        json.dump(out, f)
