from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()

driver.get("https://www.deepl.com/translator")

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


def get_translation(text):
    input_textarea = driver.find_element(
        by=By.CSS_SELECTOR, value='textarea.lmt__source_textarea')

    input_textarea.clear()
    input_textarea.send_keys(text)

    # wait if lmt__progress_popup is visible
    WebDriverWait(driver, 30).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "div.lmt__progress_popup")))
    # the loading is started, wait until it is finished
    WebDriverWait(driver, 30).until(
        EC.invisibility_of_element_located((By.CSS_SELECTOR, "div.lmt__progress_popup")))

    # Loading has ended

    output_textarea = driver.find_element(
        by=By.CSS_SELECTOR, value='#target-dummydiv')

    print("translation is done")
    print(output_textarea.get_attribute("innerHTML"))

    # make a post request to http://localhost:3000/createBook
    # with the following data:
    # {
    # "text": output_textarea.get_attribute("innerHTML"),,
    # "title": "Mp",
    # "author": "Momo",
    # "imageUrl": "",
    # "publisher": "Jet"
    # }


# loop twice
get_translation()
