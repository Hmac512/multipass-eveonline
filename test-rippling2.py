import requests
import json

cookies = {
    "cf_clearance": "rxuBg9n1oHp.33AN1nPG.XBZ2ePOnhPMWiiTtC.ID2o-1728682079-1.2.1.1-GOnFx6i2lVipF0UcHhCkgMTaFbjgfeeG.s.ayTu6Y4BF0ChCgs.AZvggdwzI2j7lIBKoonFHUMAElLkpxXJPMzPFBDeiINOAPC56YltalyTqTPcexdYiVLBrtP4IHE9qvC0G4kXZu0owiWt85ccKgROeka_4DJycD8i7LeZ14IQw4uTi63i4tpF1hjfbrjxsKLT1001_Aj14C3F4tyTZ3l7pRax5XGlQStmCXJwt2_TUkRvjEECNHk4UAXIxXKLG1aSvZaagcmFXgsU36RTNvdSJB.876T.IN8kKgYfUsbveNhtPorWTU9FAbq_Lj7H6sCoIeSLHMJK6wRXTlZmZUzuX8uEsmXxJ1sdDsgB1C6noWav0BhYltr.BX4U70_D09fx5UNO3hXE99sxXtZyyig",
}

headers = {
    # "Host": "app.rippling.com",
    # "requestedaccesslevel": "ADMIN",
    # "Accept": "application/json, text/plain, */*",
    # "app-version": "v3.0.19-1228",
    "Authorization": "Bearer PisYDuHrNedCZTHJqYRG9i24n10z2Y",
    # "baggage": "sentry-environment=production,sentry-public_key=ff20ab3a07184e1a90eb78a1a705dac5,sentry-release=3.0.19-1228,sentry-trace_id=2b0f014e5ba248c1934d3e0c82c9c569",
    # "login-agent": "rippling-mobile",
    # "company": "657b7ce3a4222e38ce1830e5",
    # "sentry-trace": "2b0f014e5ba248c1934d3e0c82c9c569-2fc5a07f474f47b4-0",
    # "Accept-Language": "en-US,en;q=0.9",
    # "device-fingerprint": "E870E6F6-5D48-4D2E-9AD6-5488464C32AE",
    # "x-amzn-trace-id": "843e0c03-b245-4af1-ba78-97ada9513b22",
    # "User-Agent": "rippling/1020 CFNetwork/3826.600.41 Darwin/24.6.0",
    # "role": "657b7ceaa4222e38ce18324a",
    # 'Cookie': 'cf_clearance=rxuBg9n1oHp.33AN1nPG.XBZ2ePOnhPMWiiTtC.ID2o-1728682079-1.2.1.1-GOnFx6i2lVipF0UcHhCkgMTaFbjgfeeG.s.ayTu6Y4BF0ChCgs.AZvggdwzI2j7lIBKoonFHUMAElLkpxXJPMzPFBDeiINOAPC56YltalyTqTPcexdYiVLBrtP4IHE9qvC0G4kXZu0owiWt85ccKgROeka_4DJycD8i7LeZ14IQw4uTi63i4tpF1hjfbrjxsKLT1001_Aj14C3F4tyTZ3l7pRax5XGlQStmCXJwt2_TUkRvjEECNHk4UAXIxXKLG1aSvZaagcmFXgsU36RTNvdSJB.876T.IN8kKgYfUsbveNhtPorWTU9FAbq_Lj7H6sCoIeSLHMJK6wRXTlZmZUzuX8uEsmXxJ1sdDsgB1C6noWav0BhYltr.BX4U70_D09fx5UNO3hXE99sxXtZyyig',
}

response = requests.get(
    "https://app.rippling.com/api/hub/api/employment_roles_with_company/657b7ceaa4222e38ce18324a/",
    # cookies=cookies,
    headers=headers,
)
response.raise_for_status()
out = response.json()
print(out)
with open("2-rippling-get-employment-roles-with-company.json", "w") as f:
    json.dump(out, f)
