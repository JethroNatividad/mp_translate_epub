from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()

driver.get("https://www.deepl.com/translator#zh/en")

driver.implicitly_wait(10)

# set input language to chinese
lang_input_element = driver.find_element(
    by=By.CSS_SELECTOR, value="div.lmt__language_select--source>button")
lang_input_element.click()

lang_input_element = driver.find_element(
    by=By.CSS_SELECTOR, value="button[dl-test='translator-lang-option-zh']")
lang_input_element.click()

# set output language to english
lang_input_element = driver.find_element(
    by=By.CSS_SELECTOR, value="div.lmt__language_select--target>button")
lang_input_element.click()

lang_input_element = driver.find_element(
    by=By.CSS_SELECTOR, value="button[dl-test='translator-lang-option-en-US']")
lang_input_element.click()

# input_textarea = driver.find_element(
#     by=By.CSS_SELECTOR, value='textarea.lmt__source_textarea')

# input_textarea.send_keys("忙了好半天")
