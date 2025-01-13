pipeline {
    agent any
    environment { 
        SONARQUBE_PATH_DEV = '/var/lib/jenkins/tools/sonar-scanner-4.2.0.1873-linux/bin/sonar-scanner -Dsonar.projectKey=HDB-RA-fe-dev -Dsonar.sources=./' 
        SONARQUBE_PATH_QA = '/var/lib/jenkins/tools/sonar-scanner-4.2.0.1873-linux/bin/sonar-scanner -Dsonar.projectKey=HDB-RA-fe-QA -Dsonar.sources=./'
    }
    stages {
        stage('Sonarqube') {
            steps {
                script {
                    if (env.Env == 'dev') {
                        nodejs('HDB') {
                            withSonarQubeEnv('Sonar') {
                                sh "${env.SONARQUBE_PATH_DEV}"
                            }
                        }
                    } else {
                        nodejs('HDB') {
                            withSonarQubeEnv('Sonar') {
                                sh "${env.SONARQUBE_PATH_QA}"
                            }
                        }
                    }
                }
            }
        }
        stage('build') {
            steps {
                nodejs('HDB') {
                    echo 'building'
                    sh 'npm install --force'
                    script {
                        if (env.Env == 'dev') {
                            echo "dev build"
                            sh 'npm run build'
                        } else {
                            echo "QA Build"
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        // stage('test') {
        //     steps {
        //         nodejs('HDB') {
        //             echo 'testing'
        //             script {
        //                 if (env.Env == 'dev') {
        //                     sh 'npm run test'
        //                 } else {
        //                     sh 'npm run test'
        //                 }
        //             }
        //         }
        //     }
        // }
        stage('deployment') {
            steps {
                script {
                    if (env.Env == 'dev') {
                        echo "Deploying Development Build"
                        sh 'tar -czvf dist.tar.gz build'
                        sh 'scp dist.tar.gz hdb@hddev.divami.com:/var/www/html/hdb-ra-dev/'
                        sh 'ssh hdb@hddev.divami.com "cd /var/www/html/hdb-ra-dev/ && sudo tar -xvzf dist.tar.gz --strip 1 "'
                        sh 'ssh hdb@hddev.divami.com "sudo systemctl restart apache2"'
                        echo "Deployment success"
                    } else {
                        echo "Deploying QA"
                        sh 'tar -czvf dist.tar.gz build'
                        sh 'scp dist.tar.gz hdb@hdqa.divami.com:/var/www/html/hdb-ra-qa/'
                        sh 'ssh hdb@hdqa.divami.com "cd /var/www/html/hdb-ra-qa/ && sudo tar -xvzf dist.tar.gz --strip 1 "'
                        sh 'ssh hdb@hdqa.divami.com "sudo systemctl restart apache2"'
                        echo "Deployment success"
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                if (env.Env == 'dev') {
                    googlechatnotification message: "Project Name: ${JOB_NAME} Build ${BUILD_NUMBER} from Branch ${Branch} on Environment ${env.Env} was successful. Check output in https:/hdradev.divami.com", url: "https://chat.googleapis.com/v1/spaces/AAAAvvizqQQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=QsCYKdNfZYKkwOVhVM1ESfAugOvKz3PFNrl5T9hQK5g"
                } else {
                    googlechatnotification message: "Project Name: ${JOB_NAME} Build ${BUILD_NUMBER} from Branch ${Branch} on Environment ${env.Env} was successful. Check output in https:/hdraqa.divami.com", url: "https://chat.googleapis.com/v1/spaces/AAAAvvizqQQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=QsCYKdNfZYKkwOVhVM1ESfAugOvKz3PFNrl5T9hQK5g"
                }
            }
        }
        failure {
            googlechatnotification message: "Project Name: ${JOB_NAME} Build ${BUILD_NUMBER} from Branch ${Branch} on Environment ${env.Env} has failed. Check output logs at ${RUN_DISPLAY_URL}", url: "https://chat.googleapis.com/v1/spaces/AAAAvvizqQQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=QsCYKdNfZYKkwOVhVM1ESfAugOvKz3PFNrl5T9hQK5g"
        }
        always {
            cleanWs()
        }
    }
}
