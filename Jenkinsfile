pipeline {
  agent any
  tools {nodejs "node"}
  stages {
    stage('Test1') {
      steps {
   
        bat 'npm install'
        echo 'Running successfully'
      }}
 
     stage('Test') {
            steps {
                
                bat 'sh jenkins/scripts/test.sh'
            }
        }
      
  }}
