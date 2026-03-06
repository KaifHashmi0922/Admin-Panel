
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from django.urls import include, path
from api import views


urlpatterns = [
    
    # path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("dashboard/", views.dashboard, name="dashboard"),
    
    # path("employee_query/", views.employee_query_view, name="employee_query"),
    path('employee_register/', views.employee_register, name='employee_register'),
    path('employee_login/', views.employee_login, name='employee_login'),
    # path('employee_logout/', views.employee_logout, name='employee_logout'),
    # path('employee_is_active/', views.employee_is_active, name='employee_is_active'),
    path('employees_list/', views.employees_list, name='employees_list'),
    path('employee_update/', views.employee_update, name='employee_update'),
    # path('employee_soft_delete/', views.employee_soft_delete, name='employee_soft_delete'),
    path('employee_delete/', views.employee_delete, name='employee_delete'),
    path('employee/send_otp/', views.send_otp, name='send_otp'),
    path('employee/verify_otp/', views.verify_otp, name='verify_otp'),
    path('employee/change-password/',views.employee_change_password,name='change-password'),
    path("employee_profile/",views.employee_profile,name='employee')


    # path("project_query/", views.project_query_view, name="project_query"),
    # path('project_register/', views.project_register, name='project_register'),
    # path('project_list/', views.project_list, name='project_list'),
    # path('project_update/', views.project_update, name='project_update'),
    # path('project_soft_delete/', views.project_soft_delete, name='project_soft_delete'),
    # path('project_delete/', views.project_delete, name='project_delete'),
    
]
