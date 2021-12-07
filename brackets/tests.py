from django.test import TestCase
from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

class LoginTest(LiveServerTestCase):
    port = 8000

    def testlogin(self):
        driver = webdriver.Chrome(ChromeDriverManager().install())
        driver.get('http://127.0.0.1:8000/')
        loginButton = driver.find_element_by_link_text('Login')

        loginButton.send_keys(Keys.RETURN)
        username= driver.find_element_by_id("login-username")
        password = driver.find_element_by_id("login-password")

        username.send_keys('447spotify04@gmail.com')
        password.send_keys('Quasar04')
        submitButton = driver.find_element_by_id("login-button")
        submitButton.send_keys(Keys.RETURN)
