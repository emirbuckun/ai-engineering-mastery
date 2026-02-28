from autogen import AssistantAgent, UserProxyAgent

llm_config = {"model": "gpt-4o-mini", "api_key": "API_KEY"}

assistant = AssistantAgent("assistant", llm_config=llm_config)
user_proxy = UserProxyAgent("user_proxy", code_execution_config=False)

user_proxy.initiate_chat(assistant, message="Tell me a joke about tech stocks.")