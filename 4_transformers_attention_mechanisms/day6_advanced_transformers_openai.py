import openai

# Set OpenAI API key
openai.api_key = ""  # Replace with your actual API key

try: 
    #Generate text using GPT-3.5 Turbo
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role":"system","content":"You are a helpful assistant."},
            {"role":"user", "content":"Write a short story about a robot learning to cook."}
        ],
        max_tokens=150,
        temperature=0.7
    )
    
    print("Generated Text:\n", response["choices"][0]["message"]["content"].strip())
    
except Exception as e:
    print(f"An error occured: {e}")