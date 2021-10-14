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
                sh './jenkins/scripts/test.sh'
            }
        }
      
  }}
