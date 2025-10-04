# Hrecords
It is a angular web app to create, update Issues which uses filter, sorting and searching to enhance the efficiency of data retrieval
                                       Hrecords
 <!-- Create backend for our project -->
 install all required softwares like python, node.js, postman, VsCode
 Then run command pip install fastapi in python---> this is for backend api
 To serve API as an endpoint we need uvicorn module
 so run pip install uvicorn
 for api inputs we run this command pip install multipart ----> for installing multipart module
 To connect with Database we need to install mysql connector ---> pip install mysql-connector-python

 After installing Node.js run ---> npm install -g @angular/cli to install latest version of angular cli
 Create file main.py which contains our backend code---> In that file import necessary modules like fastapi, mysql.connector, corsmiddleware

 Connect mysql db with mysql connector and provide root, password, host, database

 Basic syntax for fastapi is like @app.get('/') define function for which will be executed when we navigate this route

 Add middleware by writing app.add_middleware and give parameters for api to connect with cross origin 

 Now create function for different routes like creating issue, updating issue, getting health status , get issues by id

 To run backend---> python -m uvicorn main:app --reload

 Now test these routes with postman by providing data---> to check if API is working fine

 After we done with backend now let's create frontend on angular framework

 <!-- Creating frontend for our project -->
 To generate new project in angular we use command----- ng new project name -----which is in our case Hrecords
 To generate new component we use command -------> ng generate component component name--------- we generated two component first is IssueComponent it is used for showing table, updating issue and route to create issue and second is MyForm which is used for creating issue

In angular import modules like MatTableModule, MatPaginatorModule, MatSortModule,RouterOutlet etc.

To route to url we need to use either router-outlet tag in html or router.navigate['url']
MatTableModule is used for table, MatPaginator used for pagination and Matsortmoduel is used for sorting

Apart from it we created search box and filter so for filtering we have inbuilt function of mattable module which filter

For filter it can be accessed through filter image beside Issues column.

In searchbox we have used autocomplete so whenver user enter for search it shows result in dropdown. User can select the result or press enter, table will access particular record accordingly.

To use sorting when user hover on column he sees increasing or decreasing arrrow which is given for sorting ascendingly or decendingly.

We have used liveannouncer it is to provide events messages to sorting module so whenever there is change by clicking sorting it perform specific sorting accordingly.

To update Issue user have to provide id and issue and when he click on update button issue gets updated and table will be refreshed and updatedAt will changed.

To create Issue user will be directed to next page where he has to provide certain inputs for creating issue like id, title, assignee, priority etc.

In Table pagination we have used angular built in matpaginator module where items per page can be selected like 5,10, 25, 100 and there are next page and previous page button to toggle table records.




