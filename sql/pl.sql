CREATE OR REPLACE PROCEDURE ADD_DOCTOR(ID IN NUMBER, NAME IN VARCHAR2, PHONE_NUMBER IN NUMBER, 
SALARY IN NUMBER, DEPARTMENT_ID IN NUMBER, EMAIL IN VARCHAR2, PASSWORD IN VARCHAR2) IS
BEGIN
 INSERT INTO EMPLOYEES VALUES(ID, NAME, 'Doctor', PHONE_NUMBER, SALARY);
 INSERT INTO DOCTORS VALUES(ID, DEPARTMENT_ID, EMAIL);
 INSERT INTO LOGIN VALUES(ID, EMAIL, PASSWORD);
END;
/

BEGIN
	ADD_DOCTOR(4235, 'Malo', 13203, 14507, 89076, '456127@dot.com', '4156');
END;
/