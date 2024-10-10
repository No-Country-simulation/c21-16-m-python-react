from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model

CustomUser = get_user_model()


class UserEmailSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    id = serializers.CharField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id','username', 'email', 'password', 'password2',
                  'first_name', 'last_name', 'images')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "Email is already in use."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            images=validated_data.get('images', None)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        fields = ('email', 'password')

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError("User is deactivated.")
            else:
                raise serializers.ValidationError(
                    "Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError(
                "Must include 'email' and 'password'.")
        return data
