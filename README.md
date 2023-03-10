# charter 

A charter builder that creates a project charter based on a json file written in a specific way. (Made for a school project)

## Example:
```json
{
    "charter": [
        {
            "header": {
                "PROGETTO": "Project A",
                "DATA INIZIO": "2023-01-01",
                "NUM REVISIONE": 1,
                "CLIENTE": "Client A",
                "PROJECT MANAGER": "John Doe",
                "SPONSOR": "Sponsor A"
            }
        },
        {
            "content": {
                "OBIETTIVI": [
                    "Complete project A within the given timeframe",
                    "Deliver high-quality software"
                ],
                "REQUISITI": [
                    "User authentication and authorization",
                    "Secure data storage",
                    "Responsive UI"
                ],
                "DELIVERABLE": [
                    "Fully functional software"
                ],
                "MILESTONE": [
                    "Design complete",
                    "Development complete",
                    "Testing complete"
                ],
                "VINCOLI": [
                    "Project must use a specific technology stack",
                    "Budget must not exceed $500,000"
                ],
                "DIPENDENZE": [
                    "Completion of feature X is required for feature Y"
                ],
                "CALENDARIO": [
                    "Design phase: 2 weeks",
                    "Development phase: 6 months",
                    "Testing phase: 1 month"
                ],
                "TEAM": [
                    "John Doe",
                    "Jane Doe",
                    "Bob Smith"
                ],
                "BUDGET": {
                    "stima vendite addizionali": [
                        10000.0,
                        15000.0,
                        20000.0
                    ],
                    "Stima costi": [
                        400000.0,
                        500000.0,
                        600000.0
                    ]
                },
                "RISCHI": [
                    "Delays due to unexpected bugs",
                    "Lack of availability of team members"
                ],
                "FIRME": [
                    "John Doe",
                    "Jane Doe",
                    "Bob Smith",
                    "Sponsor A"
                ]
            }
        }
    ]
}
```
