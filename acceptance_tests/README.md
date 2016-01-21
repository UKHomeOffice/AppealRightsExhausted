#Example HOF Form Acceptance Tests

The tests follow the standard principles of feature files and step definitions.

##Installation:

###Install Bundler

```
gem install bundler
```

###Bundle install the Gem file

cd to the acceptance_tests folder

```
bundle install
```

##Run:

Run with
```
cucumber
```
or to run specific features:
```
cucumber features/example.feature
```

You can also run/install the tests from the root of the project using npm
```
npm run test:acceptance
```

##Yard:

Using YARD-Cucumber you can generate documentation on the features, tags and step definitions used in these tests

###Run:
Running the following from outside the acceptance_tests folder generates the documentation
```
yardoc 'features/**/*.rb' '**/*.feature'
```
Then run the following to start the local documentation server
```
yard server
```
