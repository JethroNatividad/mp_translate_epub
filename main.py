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

    # wait until textarea with lmt__target_textarea class has no dl_disabled class by using WebDriverWait
    WebDriverWait(driver, 30).until(
        EC.invisibility_of_element_located((By.CSS_SELECTOR, "textarea.lmt__target_textarea.dl_disabled")))

    # wait until div with lmt__textarea_dummydiv class has any text by using WebDriverWait
    # WebDriverWait(driver, 30).until(
    #     EC.text_to_be_present_in_element((By.CSS_SELECTOR, "#target-dummydiv"), " "))

    output_textarea = driver.find_element(
        by=By.CSS_SELECTOR, value='#target-dummydiv')

    print("translation is done")
    print(output_textarea.get_attribute("innerHTML"))


# loop twice
get_translation("那半大老者更是身子一闪")
get_translation("你们与我家伙计为难的时候")
