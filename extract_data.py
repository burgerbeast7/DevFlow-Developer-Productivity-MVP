import pandas as pd
import json
import os

excel_file = 'k:/jj/intern_assignment_developer_productivity_packet_v4/intern_assignment_support_pack_dev_only_v3.xlsx'
output_file = 'k:/jj/actual_data.json'

def extract_excel_data():
    if not os.path.exists(excel_file):
        print(f"Error: {excel_file} not found")
        return

    xls = pd.ExcelFile(excel_file)
    sheets_to_extract = ['Dim_Developers', 'Fact_Jira_Issues', 'Fact_Pull_Requests', 'Fact_CI_Deployments', 'Fact_Bug_Reports']
    data = {}
    
    for sheet_name in sheets_to_extract:
        df = pd.read_excel(xls, sheet_name=sheet_name)
        # Convert Timestamps to ISO strings
        for col in df.columns:
            if pd.api.types.is_datetime64_any_dtype(df[col]):
                df[col] = df[col].apply(lambda x: x.isoformat() + 'Z' if pd.notnull(x) else None)
        
        data[sheet_name] = df.where(pd.notnull(df), None).to_dict(orient='records')
        
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Data saved to {output_file}")

if __name__ == "__main__":
    extract_excel_data()
