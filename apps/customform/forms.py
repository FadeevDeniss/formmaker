from django.forms import ModelForm, TextInput, Select

from apps.customform.models import BaseFormModel, BaseFieldModel, BaseAnswerModel


class BaseModelForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(BaseModelForm, self).__init__(*args, **kwargs)
        self.auto_id = True

    class Meta:
        model = BaseFormModel
        widgets = {
            'name': TextInput(),
            'description': TextInput(
                attrs={
                    'class': 'description'
                }
            )
        }
        fields = ('name', 'description',)


class BaseFieldForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(BaseFieldForm, self).__init__(*args, **kwargs)
        self.auto_id = True

    class Meta:
        model = BaseFieldModel
        widgets = {
            'name': TextInput(
                attrs={
                    # 'name': 'field',
                    'placeholder': 'Question',
                    'class': 'fieldName'}
            ),
            'type': Select(
                attrs={
                    # 'name': 'type',
                    'class': "type"
                }
            )
        }
        fields = ('name', 'type',)


class BaseAnswerForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(BaseAnswerForm, self).__init__(*args, **kwargs)
        self.auto_id = True
        # pass

    class Meta:
        model = BaseAnswerModel
        widgets = {
            'answer': TextInput(
                attrs={
                    'class': 'answerContent'
                }
            )
        }
        fields = ('answer',)

